const fetchGet = () => {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/danilova-veronika/comments", {
      
        method: "GET",
      
        });
    

}

export default fetchGet;