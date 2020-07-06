import { aplicarOpciones } from '../util/filtroHelpers.js'

export default class TrackService {
    #AllTracksView;
    #model;
    #TracksWithoutArtist;

    constructor ({DI}){
        this.#model = DI.models.Track;
        this.#AllTracksView = DI.models.AllTracksView;
        this.#TracksWithoutArtist = DI.models.TracksWithoutArtist;
    }   
    
     async getAllTracksView(){
        return await this.#AllTracksView();
    }
    
     async callTracksWithoutArtist(){
         const result = await this.#TracksWithoutArtist();
        return result[0][0]['@out'];
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

