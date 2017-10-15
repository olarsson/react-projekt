const listReducer = (
  state = {
    list_all: {
      topics: [],
      posts: []
    },
    topic_list: []
  },
  action
) => {
  switch (action.type) {
    case "TOPICSANDCOMMENTSLIST":
      return {
        list_all: action.payload
      };
    case "TOPICLIST":
      return {
        topic_list: action.payload
      };      
    default:
      return state;
  }
}

export default listReducer;
