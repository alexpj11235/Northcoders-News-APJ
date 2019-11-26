import React, { Component } from "react";
import * as api from "../utilities/api";
import { Link } from "@reach/router";
import CommentCard from "./CommentCard";

class Article extends Component {
  state = { article: {}, comments: [] };

  componentDidMount() {
    api.fetchArticleById(this.props.article_id).then(({ article }) => {
      this.setState({ article });
    });
    api.fetchCommentsByArticleId(this.props.article_id).then(({ comments }) => {
      this.setState({ comments });
    });
  }

  render() {
    return (
      <div>
        <Link to={`/topics/${this.state.article.topic}`}>
          back to {this.state.article.topic}
        </Link>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.body}</p>
        {this.state.comments.map(comment => {
          return (
            <CommentCard
              className="CommentCard"
              key={comment.comment_id}
              comment={comment}
            ></CommentCard>
          );
        })}
      </div>
    );
  }
}

export default Article;
