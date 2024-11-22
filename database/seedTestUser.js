const User = require("../models/user.model");
const log = require("../utils/logger");

const seedTestUser = async () => {
    const testUserData = { name: "test-user", email: "testuser@test.com" };

    try {
        const testUser = await User.findOne({
            where: testUserData,
        });

        if (!testUser) {
            const newTestUser = await User.create(testUserData);
            const cart = await newTestUser.getCart();
            log("New test user has been created.", "success");
            if (!cart) {
                await newTestUser.createCart();
                log("New test cart has been created.", "success");
            }
        }
    } catch (error) {
        log(error, "error");
        
    }
};

module.exports = seedTestUser;
