import app from "@/setup";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
