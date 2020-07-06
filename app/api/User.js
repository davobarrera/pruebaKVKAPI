import UserService from '../services/User.js'
import FilterError from '../errors/FilterError.js'

export default function ({DI, router}){
    const service = new UserService({DI})
    router.get('/procedure/user/without/album/or/track', callUserWithoutAlbumOrTrack(service));
    router.post('/all', getAll(service));
    router.put('/:id', update(service));
    router.delete('/:id', _delete(service));
    router.get('/:id', getById(service));
    router.post('/new', _new(service));


    return router;
}

function callUserWithoutAlbumOrTrack(service) {
    return async (req, res) => {
        res.json(await service.callUserWithoutAlbumOrTrack());
    }
}
function getAll(service) {
    return async (req, res) => {
        try{
            res.json(await service.getAll(req.body));
        }catch(err){
            console.error(err);
            if(err instanceof FilterError){
                res.status(400).json({error: err.message});
            }else{
                res.status(400).json({error: err.message});
            }

        }
    }
}
function update(service) {
    return async (req, res) => {
        try{
            res.json(await service.update(req.params.id,req.body));
        }catch(err){
            console.error(err);
            res.status(400).json({error: err.message});
        }
    }
}
function _new(service) {
    return async (req, res) => {
        try{
            res.json(await service._new(req.body));
        }catch(err){
            console.error(err);
            res.status(400).json({error: err.message});
        }
    }
}
function _delete(service) {
    return async (req, res) => {
        try{
            res.json(await service.delete(req.params.id));
        }catch(err){
            console.error(err);
            res.status(400).json({error: err.message});
        }
    }
}
function getById(service) {
    return async (req, res) => {
        try{
            res.json(await service.getById(req.params.id));
        }catch(err){
            console.error(err);
            res.status(400).json({error: err.message});
        }
    }
}