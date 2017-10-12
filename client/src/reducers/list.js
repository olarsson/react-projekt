const listReducer = (
  state = {
    list_all: [],
    blog_list: []
  },
  action
) => {
  //console.log(' -- reducer --')
  switch (action.type) {
    case "LISTPOSTSANDCOMMENTS":
      //console.info("LISTPOSTSANDCOMMENTS: ", action.payload)
      return {
        list_all: action.payload
      };
    case "BLOGLIST":
      //console.info("BLOGLIST: ", action.payload)
      return {
        blog_list: action.payload
      };      
    default:
      return state;
  }
}

export default listReducer;
