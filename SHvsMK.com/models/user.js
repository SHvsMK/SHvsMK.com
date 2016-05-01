var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  create_at: { type: Date, default: Date.now },
  updata_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  // access_token: { type: String },
});

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});
// UserSchema.index({access_token: 1});

mongoose.model('User', UserSchema);
