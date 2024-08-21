import axios from "axios";

const API = {
    search: (query) => {
        console.log(query);
        return axios.post("/api/search", query);
    },

    getArticles: function () {
        return axios.get("/api/saved");
    },
    
    deleteArticle: function (id) {
        return axios.delete("/api/saved/" + id);
    },
    
    saveArticle: function (article) {
        console.log("im about to save");
        console.log(article);
        return axios.post("/api/saved", article);
    }
};
export default API;