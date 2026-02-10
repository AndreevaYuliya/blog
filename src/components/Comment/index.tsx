import { FC } from "react";

import { Avatar, Box, colors, Typography } from "@mui/material";

import { deleteComment } from "../../api/commentsActions";
import { useAppSelector } from "../../store/store";
import type { Comment as CommentType } from "../../types/CommentsApi";

import { useAlertContext } from "../../providers/AlertContext";

import DeleteButton from "../IconButtons/Delete";

import styles from "./styles";

type Props = CommentType & {
  exhibitId: string;
  mutateComments: (
    updater: (prev?: CommentType[]) => CommentType[] | undefined,
  ) => void;
};

const Comment: FC<Props> = (props) => {
  const { id, text, createdAt, user, exhibitId, mutateComments } = props;

  const { showAlert } = useAlertContext();

  const currentUserId = useAppSelector((s) => s.user.user?.id);
  const isOwner = currentUserId === user.id;

  const handleDelete = async () => {
    if (!isOwner) {
      showAlert("You can only delete your own comments.", "error");

      return;
    }

    try {
      await deleteComment({
        exhibitId,
        commentId: String(id),
      });

      mutateComments((prev) => prev?.filter((c) => c.id !== id));

      showAlert("Comment deleted successfully", "success");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message || "Failed to delete comment"
          : "Failed to delete comment. Please try again.";

      showAlert(message, "error");
    }
  };

  return (
    <Box sx={styles.container}>
      <Avatar src={user.username} alt={user.username} sx={styles.avatar} />

      <Box flex={1}>
        <Typography variant="h6" fontWeight="bold" color={colors.green[400]}>
          {user.username}
        </Typography>

        <Typography
          variant="body2"
          color="success"
          sx={{
            wordBreak: "break-word",
          }}
        >
          {text}
        </Typography>

        <Typography variant="caption" color={colors.green[400]}>
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </Box>

      {isOwner && <DeleteButton onDelete={handleDelete} />}
    </Box>
  );
};

export default Comment;

