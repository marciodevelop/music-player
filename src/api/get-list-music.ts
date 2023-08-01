import axios from "axios"

const teste = '5VhUPmOwSNuj1ZShpIdKbK'

export const getListMusic = () => {
    return axios.get(`albums/${teste}`, {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
    });
}