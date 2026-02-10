import { FC } from "react";

import { Avatar, Box, Card, colors, Typography } from "@mui/material";
import { useRequest } from "ahooks";

import {
  GetExhibitResponse,
  GetExhibitsResponse,
} from "../../types/ExhibitsApi";
import { useAppSelector } from "../../store/store";
import { deleteExhibit } from "../../api/exhibitActions";
import { useAlertContext } from "../../providers/AlertContext";

import CommentStripe from "../CommentStripe";
import DeleteButton from "../IconButtons/Delete";
import styles from "./styles";

type Props = GetExhibitResponse & {
  isFirstPost: boolean;
  isLastPost: boolean;
  mutatePosts: (
    updater: (prev: GetExhibitsResponse | null) => GetExhibitsResponse | null,
  ) => void;
};

const Post: FC<Props> = (props) => {
  const {
    user,
    imageUrl,
    description,
    createdAt,
    commentCount,
    isFirstPost,
    isLastPost,
    mutatePosts,
  } = props;

  const { showAlert } = useAlertContext();

  const currentUserId = useAppSelector((s) => s.user.user?.id);
  const isOwner = currentUserId === user.id;

  const fallback =
    "https://t4.ftcdn.net/jpg/07/91/22/59/360_F_791225927_caRPPH99D6D1iFonkCRmCGzkJPf36QDw.jpg";

  const { runAsync: runDeletePost } = useRequest(
    (exhibitId: number | string) => deleteExhibit({ id: String(exhibitId) }),
    {
      manual: true,
    },
  );

  const handleDeletePost = async () => {
    if (!isOwner) {
      showAlert("You can only delete your own posts.", "error");

      return;
    }

    try {
      await runDeletePost(props.id);

      mutatePosts((prev) => {
        if (!prev) {
          return null;
        }

        return {
          ...prev,
          data: prev.data.filter((p) => p.id !== props.id),
          total: Math.max(prev.total - 1, 0),
        };
      });

      showAlert("Post deleted successfully", "success");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message || "Failed to delete post"
          : "Failed to delete post. Please try again.";

      showAlert(message, "error");
    }
  };

  return (
    <Card sx={styles.container(isFirstPost, isLastPost)}>
      <Box sx={styles.userContainer}>
        <Avatar
          src={user.username}
          alt={user.username}
          sx={{
            backgroundColor: colors.green[50],
            color: colors.green[500],
            textTransform: "uppercase",
          }}
        />

        <Box>
          <Typography variant="h6" sx={styles.username}>
            {user.username}
          </Typography>

          <Typography variant="body2" color="success">
            {new Date(createdAt).toLocaleString()}
          </Typography>
        </Box>

        {isOwner && <DeleteButton onDelete={handleDeletePost} />}
      </Box>

      <Box flex={1}>
        <img
          src={imageUrl || fallback}
          alt={description}
          style={styles.image}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />

        <Typography variant="body1" color="success" sx={styles.description}>
          {description}
        </Typography>
      </Box>

      <CommentStripe postId={String(props.id)} commentCount={commentCount} />
    </Card>
  );
};

export default Post;

