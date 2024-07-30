const mongoose =require("mongoose");

const connectToMongoDB = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/Gaming");
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

module.exports = connectToMongoDB;