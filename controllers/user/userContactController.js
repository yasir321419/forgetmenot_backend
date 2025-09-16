const prisma = require("../../config/prismaConfig");
const { ValidationError, NotFoundError, ConflictError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");
const uploadFileWithFolder = require("../../utils/s3Uploads");
const { v4: uuidv4 } = require('uuid');
const path = require("path");




const saveUserContacts = async (req, res, next) => {
  try {
    // Destructure the request body
    const { email, name, phone } = req.body;

    // Log the request body for debugging
    console.log(req.body);

    const { id } = req.user;
    const files = req.files;  // Multiple files in an array
    const file = req.file;    // Single file
    console.log(files, 'files');  // Log files for debugging

    const contacts = [];

    // Loop through each contact to save
    for (let i = 0; i < name.length; i++) {
      // Check if contact with the same name, email, and phone already exists
      const existingContact = await prisma.contacts.findFirst({
        where: {
          email: email[i],
          phoneNumber: phone[i],
          name: name[i],
        },
      });

      if (existingContact) {
        return res.status(200).json({
          success: false,
          message: `Contact with email ${email[i]} and phone ${phone[i]} already exists.`,
        });
      }

      // Initialize image variable
      let image = null;

      // Handle file upload
      if (files && files[i]) {  // If multiple files are provided and there's a file for this contact
        const file = files[i];  // Get the file for this contact
        const fileBuffer = file.buffer;  // The file buffer
        const folder = 'uploads';  // Folder name in S3
        const filename = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        const contentType = file.mimetype || 'application/octet-stream';

        // Upload the file to S3 and get the URL
        const s3ImageUrl = await uploadFileWithFolder(fileBuffer, filename, contentType, folder);
        image = s3ImageUrl;  // Assign the image URL
      } else if (file) {  // If only a single file is uploaded
        const fileBuffer = file.buffer;
        const folder = 'uploads';  // Folder name in S3
        const filename = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        const contentType = file.mimetype || 'application/octet-stream';

        // Upload the file to S3 and get the URL
        const s3ImageUrl = await uploadFileWithFolder(fileBuffer, filename, contentType, folder);
        image = s3ImageUrl;  // Assign the image URL
      }

      // Push contact data to array
      contacts.push({
        name: name[i],
        email: email[i],
        phoneNumber: phone[i],
        image: image,  // This can be null if no file is uploaded
        createdById: id,
      });

      console.log(contacts, 'contacts');
    }

    // Save the contacts to the database
    const saved = await prisma.contacts.createMany({
      data: contacts
    });

    if (!saved) {
      throw new ValidationError("Contact not saved");
    }

    handlerOk(res, 200, saved, "Contacts saved successfully");
  } catch (error) {
    next(error);
  }
};


const showUserContacts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const findusercontacts = await prisma.contacts.findMany({
      where: {
        createdById: id
      }
    });

    if (findusercontacts.length === 0) {
      throw new ValidationError("contact not found")
    }

    handlerOk(res, 200, findusercontacts, 'contact found successfully')
  } catch (error) {
    next(error)
  }
}

const editUserContact = async (req, res, next) => {
  try {
    const { email, name, phone, relation } = req.body;
    const { id } = req.user;
    const { contactId } = req.params;
    const file = req.file;

    const updatedObj = {}

    if (file) {
      const fileBuffer = file.buffer;
      const folder = 'uploads';  // Folder name in S3
      const filename = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
      const contentType = file.mimetype || 'application/octet-stream';

      // Upload the file to S3 and get the URL
      const s3ImageUrl = await uploadFileWithFolder(fileBuffer, filename, contentType, folder);
      image = s3ImageUrl;  // Assign the image URL
    }


    if (email) {
      updatedObj.email = email;
    }
    if (name) {
      updatedObj.name = name;
    }
    if (phone) {
      updatedObj.phoneNumber = phone;
    }

    if (relation) {
      updatedObj.relation = relation;
    }

    const updateuser = await prisma.contacts.update({
      where: {
        id: contactId,
        createdById: id
      },
      data: updatedObj
    });

    if (!updateuser) {
      throw new ValidationError("user not updated")
    }

    handlerOk(res, 200, updateuser, 'user updated successfully');

  } catch (error) {
    next(error)
  }
}

const deleteUserContact = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { contactId } = req.params;

    const findcontact = await prisma.contacts.findUnique({ where: { id: contactId, createdById: id } });

    if (!findcontact) {
      throw new NotFoundError("contact not found")
    }

    const deleteContact = await prisma.contacts.delete({ where: { id: findcontact.id, createdById: id } });

    if (!deleteContact) {
      throw new ValidationError("contact not deleted")
    }

    handlerOk(res, 200, null, "contact deleted successfully")
  } catch (error) {
    next(error)
  }
}

const saveFavoriteUserContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { id } = req.user;



    console.log(contactId, 'contactId');

    const findcontact = await prisma.contacts.findUnique({
      where: {
        id: contactId,
        createdById: id
      }
    });

    if (!findcontact) {
      throw new NotFoundError("contact not found")
    }

    const alreayexistinfavotite = await prisma.favoriteContact.findFirst({
      where: {
        contactId: findcontact.id,
        createdById: id
      }
    });

    if (alreayexistinfavotite) {
      // throw new ConflictError("contact already in favorite")

      return res.status(200).json({
        success: false,
        message: "contact already in favorite",
      });
    }

    const savecontactinfavorite = await prisma.favoriteContact.create({
      data: {
        contactId: findcontact.id,
        createdById: id
      }
    });

    if (!savecontactinfavorite) {
      // throw new ValidationError("contact not saved in favorite list")

      return res.status(200).json({
        success: false,
        message: "contact not saved in favorite list",
      });
    }

    handlerOk(res, 200, savecontactinfavorite, 'contact save in favorite list')

  } catch (error) {
    next(error)
  }
}

const showFavoriteUserContacts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const favoriteContacts = await prisma.favoriteContact.findMany({
      where: {
        createdById: id
      },
      include: {
        contact: true
      }
    });

    if (favoriteContacts.length === 0) {
      throw new NotFoundError("favorite contact not found")
    }

    handlerOk(res, 200, favoriteContacts, 'favorite contact found successfully')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  saveUserContacts,
  editUserContact,
  deleteUserContact,
  saveFavoriteUserContact,
  showFavoriteUserContacts,
  showUserContacts
}