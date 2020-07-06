
import Album from '../api/Album.js'
import Track from '../api/Track.js'
import User from '../api/User.js'
import Country from '../api/Country.js'
import DB from '../api/DB.js'
// import User from '../models/User.js'
// import Country from '../models/Country.js'

export default async function ({DI, app, express,config}){
    const api = express.Router()
    api.use('/album',Album({router: express.Router(), DI}))
    api.use('/track',Track({router: express.Router(), DI}))
    api.use('/user',User({router: express.Router(), DI}))
    api.use('/country',Country({router: express.Router(), DI}))
    api.use('/db',DB({router: express.Router(), config}))
    app.use('/api',api)
    app.use('/',express.static('static'))
}

