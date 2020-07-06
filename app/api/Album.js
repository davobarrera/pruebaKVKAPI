import AlbumService from '../services/Album.js'

export default function ({DI, router}){
    const service = new AlbumService({DI})
    router.get('/peru/loves/rock', AllAlbumsFromPeru(service));
    router.get('/tracks/with/different/genre', getTracksWithDifferentGenre(service));
    router.get('/procedure/album/without/tracks', callAlbumWithoutTracks(service));
    router.post('/all', getAll(service));
    router.put('/:id', update(service));
    router.delete('/:id', _delete(service));
    router.get('/:id', getById(service));
    router.post('/new', _new(service));

    return router;
}

function countAll(service) {
    return async (req, res) => {
        res.json(await service.getCount());
    }
}
function AllAlbumsFromPeru(service){
    return async (req, res) => {
        res.json(await service.getAllAlbumsFromPeru());
    }
}
function getTracksWithDifferentGenre(service){
    return async (req, res) => {
        res.json(await service.getTracksWithDifferentGenre());
    }
}
function callAlbumWithoutTracks(service){
    return async (req, res) => {
        res.json(await service.callAlbumWithoutTracks());
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