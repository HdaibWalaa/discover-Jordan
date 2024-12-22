import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import styles from "../Tiles/Posts/PostCardStyles";

const ReplyComment = ({
  reply,
  handleEditReply,
  handleSaveEditReply,
  handleDeleteReply,
  handleLikeDislikeReply,
}) => {
  const [editReply, setEditReply] = useState(null);

  const handleEdit = (replyId, content) => {
    setEditReply({ id: replyId, content });
  };

  const handleSave = () => {
    handleSaveEditReply(editReply.id, editReply.content);
    setEditReply(null);
  };

  return (
    <View style={styles.reply}>
      <Image source={{ uri: reply.avatar }} style={styles.replyUserImage} />
      <View style={styles.replyContent}>
        <Text style={styles.replyUserName}>{reply.username}</Text>
        <Text style={styles.replyTime}>{reply.created_at}</Text>
        {editReply && editReply.id === reply.id ? (
          <TextInput
            style={styles.replyInput}
            value={editReply.content}
            onChangeText={(text) =>
              setEditReply({ ...editReply, content: text })
            }
          />
        ) : (
          <Text style={styles.replyText}>{reply.content}</Text>
        )}
        <View style={styles.replyActions}>
          <TouchableOpacity onPress={() => handleLikeDislikeReply(reply.id)}>
            <Text style={styles.replyAction}>
              {reply.liked ? "Dislike" : "Like"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit(reply.id, reply.content)}>
            <Text style={styles.replyAction}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteReply(reply.id)}>
            <Text style={styles.replyAction}>Delete</Text>
          </TouchableOpacity>
        </View>
        {editReply && editReply.id === reply.id && (
          <TouchableOpacity onPress={handleSave} style={styles.saveEditButton}>
            <Text style={styles.replyAction}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ReplyComment;
