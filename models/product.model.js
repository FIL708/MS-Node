const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model("Product", productSchema);

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db.collection("products").updateOne(
//                 { _id: new mongodb.ObjectId(this._id) },
//                 {
//                     $set: {
//                         title: this.title,
//                         price: this.price,
//                         description: this.description,
//                         imageUrl: this.imageUrl,
//                     },
//                 }
//             );
//         } else {
//             dbOp = db.collection("products").insertOne(this);
//         }
//         return dbOp;
//     }

//     static getAll() {
//         const db = getDb();
//         return db
//             .collection("products")
//             .find()
//             .toArray()
//             .then((results) => {
//                 return results;
//             });
//     }

//     static findById(id) {
//         const db = getDb();
//         return db
//             .collection("products")
//             .find({ _id: new mongodb.ObjectId(id) })
//             .next()
//             .then((result) => {
//                 return result;
//             });
//     }

//     static deleteById(id) {
//         const db = getDb();
//         return db
//             .collection("products")
//             .deleteOne({ _id: new mongodb.ObjectId(id) });
//     }
// }

// module.exports = Product;
