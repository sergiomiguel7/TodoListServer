const port = process.env.PORT || 5000;
const express = require('express');
const app = express();

require('./db/connection.js')(app, () => {
    require('./middleweares/index')(app);
    require('./middleweares/router')(app);

    app.listen(port, () => console.log(`Server started on port ${port}`));
})