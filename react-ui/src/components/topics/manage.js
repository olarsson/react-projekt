import React, { Component } from "react";
import fire from "../../config/fire";
import CreateTopic from './create';

class Topics extends Component {

  componentDidMount() {
    if (this.props.logged_in) this.getTopicsAndComments(this);
  }  

  deleteTopicAndComments(e, that, topicid) {
    let btn = e.target;
    if (!btn.disabled) {
      btn.disabled = true;
      fetch("/admin/delete/topic_and_comments", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topicid: topicid,
          token: that.props.token
        })
      })
      .then(response => response.json())
      .then(json => {
        btn.disabled = false;
        this.getTopicsAndComments(this)
      }).catch(error => {
        btn.disabled = false;
      })
    }
  }

  getTopicsAndComments(that) {
    fire.database().ref("topics").orderByChild("created").once("value").then(function(snaps) {
      let x = [],
      i = 0;
      snaps.forEach(snapshot => {
        i++;
        x.push({
          id: snapshot.key,
          created: snapshot.val().created,
          text: snapshot.val().text,
          key: i
        });
      });
      that.props.topiclist(x)
    })
  }

  none(e) {
    e.preventDefault();
  }

  printPosts() {
    if (this.props.topic_list) {
      return (
        this.props.topic_list.map((post, i) => {
          return (
            <div className="topic" key={i}>
              <div className="text">
                <p>{decodeURI(post.text)}</p>
                <div className="date">{(new Date(post.created).toLocaleString())}</div>
                <div className="by">{post.id}</div>
                <button type="submit" onClick={(e, that, topicid) => this.deleteTopicAndComments(e, this, post.id)}>Delete</button>
              </div>
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
          <h3>Topics</h3>
          {this.printPosts()}
          {<CreateTopic {...this.props} gettopics_and_comments={this.getTopicsAndComments}/>}
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

export default Topics;