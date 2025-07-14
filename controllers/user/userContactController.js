const prisma = require("../../config/prismaConfig");
const { ValidationError, NotFoundError, ConflictError } = require("../../handler/CustomError");
const { handlerOk } = require("../../handler/resHandler");

const saveUserContacts = async (req, res, next) => {
  try {
    const { email, name, phone, relation } = req.body;
    const { id } = req.user;
    const files = req.files;
    console.log(files, 'files')
    const contacts = [];

    for (let i = 0; i < name.length; i++) {
      const filePath = files[i].filename; // use filename instead of path
      const basePath = `http://${req.get("host")}/public/uploads/`;
      const image = `${basePath}${filePath}`;

      contacts.push({
        name: name[i],
        email: email[i],
        phoneNumber: phone[i],
        image: image,
        createdById: id,
        relation: relation[i]
      })
    }

    const saved = await prisma.contacts.createMany({
      data: contacts
    });

    if (!saved) {
      throw new ValidationError("contact not save")
    }

    handlerOk(res, 200, saved, "contact saved successfully")
  } catch (error) {
    next(error)
  }
}


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
      const filePath = file.filename; // use filename instead of path
      const basePath = `http://${req.get("host")}/public/uploads/`;
      const image = `${basePath}${filePath}`;
      updatedObj.image = image
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
      throw new ConflictError("contact already in favorite")
    }

    const savecontactinfavorite = await prisma.favoriteContact.create({
      data: {
        contactId: findcontact.id,
        createdById: id
      }
    });

    if (!savecontactinfavorite) {
      throw new ValidationError("contact not saved in favorite list")
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