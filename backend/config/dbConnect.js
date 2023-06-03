import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('DB is already connected!');
		return;
	}

	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;

		console.log('DB connected!!');
	} catch (error) {
		console.log(error);
	}
};
