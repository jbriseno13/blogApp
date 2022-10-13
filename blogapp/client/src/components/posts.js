import { useState, useEffect } from "react";
import Form from "./form";
import EditForm from "./editform";

function Posts() {
  
  // this is my original state with an array of students 
  const [posts, setPosts] = useState([]);
  const [editedPosts, setEditedPosts] = useState(null);

  // New State to contro the existing student Id that the user wants to edit

  
  useEffect(() => {
    fetch("http://localhost:8081/api/blogs")
      .then((response) => response.json())
      .then(() => {
            setPosts(posts);
          });
  }, []);

  // const updatePosts = (existingPosts) => {
  //   return fetch(`http://localhost:8080/api/posts/${existingPosts.id}`, {
  //     method:'PUT',
  //     headers: {'Content-Type' : 'applicationContact'},
  //     body: JSON.stringify(existingPosts)
  //   }).then((response) => {
  //     return response.json()
  //   }).then((data) => {
  //     console.log("From put request", data);
  //     setPosts(data);
  //     setEditedPosts(null);
  //   });
  // }


 

  //A function to control the update in the parent (student component)


  return (
    <div className="posts">
     
      <ul>
        {posts.map((p) => (
          <li key={posts.id}>
            {posts.id} {posts.timestamp} {posts.post} {posts.image}
          </li>
        ))}
      </ul>
      <Form />
    </div>
    
  );
}

export default Posts;
