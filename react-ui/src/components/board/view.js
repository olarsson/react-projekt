import React, { Component } from "react";
import MakeComment from "../comments/make_comment";

class Board extends Component {

  state = {
    error: null
  }

  componentDidMount() {
    if (this.props.logged_in) this.getBoard(this);
  }

  getBoard(that) {

    fetch("/board/view", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(json => {
      if (json.result === "success") {
        that.setState({error: null})
        that.props.boardlist({
          topics: json.topics,
          posts: json.posts
        })
      } else {
        that.setState({error: json.message })
      }
    })
    .catch(error => { that.setState({error: "Fetch request failed" }) })

  }


  deleteComment(e, token, postid, postedby) {

    if (token) {
      fetch("/admin/delete/comment", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postid: postid,
          token: token,
          postedby: postedby
        })
      })
      .then(response => response.json())
      .then(json => {
        if (json.result === "success") {
          this.setState({error: null})
          this.getBoard(this);
        } else {
        /*  this.setState({
            error: json.message,
            error_mode: 2
          })*/
        }
      })
      /*.catch(error => {
        this.setState({
          error: "Fetch request failed",
          error_mode: 2
        })
      })*/

    }
  
  }


  none(e) {
    e.preventDefault();
  }


  printPosts() {
    
    if (this.props.list_all) {
    
      return (
        this.props.list_all.topics.map((topic, i) => {
          return (
            <div className="topic" key={i}>
              <div className="text">
                <p>{decodeURI(topic.text)}</p>
                <div className="date">{(new Date(topic.created).toLocaleString())}</div>
                <div className="by">{topic.email ? topic.email : 'User deleted'}</div>
              </div>
              {
                this.props.list_all.posts.map((post, ii) => {
                  if (topic.id === post.reference) {
                    return (
                      <div className="comment" key={ii}>
                        <div className="text">
                          <p>{decodeURI(post.text)}</p>
                          <div className="date">{(new Date(post.created).toLocaleString())}</div>
                          <div className="by">{post.email ? post.email : 'User deleted'}</div>
                          {(post.postedby === this.props.uid || this.props.role === "admin" ? <button onClick={() => this.deleteComment(this, this.props.token, post.id, post.postedby)}></button> : '')}
                        </div>
                      </div>
                    )
                  }
                }, topic.id)
              }
              <button onClick={this.none} className="makecomment_visible">Comment</button>
              <MakeComment {...this.props} getBoard={this.getBoard} reference={topic.id}/>
            </div>
          )
        })
      );

    }
    
  }


  returnedFunc() {
    if (this.props.logged_in) {
      return (
        <div>
          <h3>All posts</h3>
          {this.state.error !== null && this.state.error_mode === 1 ?
            <p>Error: {this.state.error}</p>
            :
            this.printPosts()
          }
        </div>
      );
    } else {
      return <p>You need to be logged in.</p>;
    }
  }

  render() {
    return <div className="main">{this.returnedFunc()}</div>;
  }
}

export default Board;