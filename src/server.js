const app = require('./app');
const {connectToDb} = require("./utils/db");
const PORT = process.env.PORT || 3000;

connectToDb().catch(console.dir)
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

});
