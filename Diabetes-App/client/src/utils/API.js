import axios from "axios";

const API = {
    newUser: (newUser) => {
        let weight = parseInt(newUser.weight);
        let ic = 1800 / weight;
        let ip = ic * (1 / .36);
        let bsRaise = 707.54574 * Math.pow(weight, -1.000424505);
        let cf = ic * bsRaise;
        let calcObj = {
            ic: ic.toFixed(2),
            ip: ip.toFixed(2),
            bsRaise: bsRaise.toFixed(2),
            cf: cf.toFixed(2)
        }
        Object.assign(newUser, calcObj);
        console.log(newUser);
        return axios.post("/api/newUser", newUser);
    },

    getSettings: () => {
        return axios.get("/api/getSettings");
    },

    setSettings: (newSettings) => {
        return axios.post("/api/setSettings", newSettings);
    },

    deleteUser: () => {
        return axios.delete("/api/deleteUser");
    }


};
export default API;