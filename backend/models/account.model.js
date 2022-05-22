//specialist //manager
const authorityLevel = [
          "",
          "SPECIALIST", //chuyenvien
          "MANAGER", //Quan ly
          "ADMIN",
]; // Admin]

var accountSchema = mongoose.Schema(
          {
                    username: String,
                    password: String,
                    firstName: String,
                    surName: String,
                    email: String,
                    published: Boolean,
                    messageOn: Boolean,
                    avatarColor: String,
                    authorityLevel: String,
                    notification: [
                              {
                                        read: Boolean,
                                        title: String,
                                        message: String,
                                        createdTime: String,
                              },
                    ]
          },
          { timestamps: true }
);
mongoose.model("Account", accountSchema);
