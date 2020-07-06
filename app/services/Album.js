import { aplicarOpciones } from '../util/filtroHelpers.js'

export default class AlbumService {
    #model;
    #allAlbumsFromPeru;
    #AlbumWithoutTracks;
    #TracksWithDifferentGenre;

    constructor ({DI}){
        this.#model = DI.models.Album;
        this.#allAlbumsFromPeru = DI.models.AllAlbumsFromPeru;
        this.#AlbumWithoutTracks = DI.models.AlbumWithoutTracks;
        this.#TracksWithDifferentGenre = DI.models.TracksWithDifferentGenre;
    }   

    getCount(){
        return this.#model.count({});
    }

    getAllAlbumsFromPeru(){
        return this.#allAlbumsFromPeru()
    }

    async callAlbumWithoutTracks(){
        const result = await this.#AlbumWithoutTracks();
        return result[0][0]['@out'];
    }

    async getTracksWithDifferentGenre(){
        return this.#TracksWithDifferentGenre();
    }

    getAll(opciones) {
        return this.#model.findAll(aplicarOpciones(opciones))
    }

    getById(id){
        return this.#model.findByPk(id)
    }
    async update(id,payload){
        let obj = await this.#model.findByPk(id)
        Object.assign(obj,payload);
        return await obj.save();
    }
    async _new(payload){
        let obj = await this.#model.create(payload)
        return await obj.save();
    }
    async delete(id){
        let obj = await this.#model.findByPk(id)
        return obj.destroy();
    }
}