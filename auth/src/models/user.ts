import { Password } from './../services/password';
import mongoose from 'mongoose';

// Interface that describes the properties
// that are required to create a new User
interface UserAttributes {
  email: string;
  password: string;
}

// Teach typescript User.build exists
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

// User Document
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Intercept from attempt to save user, to hash and override the password
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//custom function built in the schema
userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};
const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

// // function that makes sure email and password are passed
// const buildUser = (attrs: UserAttributes) => {
//   return new User(attrs);
// };

export { User };
