import { FC, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import { useRequest } from "ahooks";

import { getComments } from "../../api/commentsActions";

import NewCommentForm from "../NewCommentForm";
import Comment from "../Comment";

import styles from "./styles";

type Props = {
  postId: string;
  commentCount: number;
};

const CommentStripe: FC<Props> = (props) => {
  const { postId, commentCount } = props;

  const [expanded, setExpanded] = useState(false);

  const {
    runAsync: runGetComments,
    data: comments,
    mutate: mutateComments,
    error,
    loading: isLoading,
  } = useRequest(() => getComments({ exhibitId: postId }), {
    manual: true,
  });

  const isDisabled = isLoading || !!error;

  const handleChange = async (_: unknown, isExpanded: boolean) => {
    if (!isExpanded) {
      setExpanded(false);

      return;
    }

    await runGetComments();

    setExpanded(true);
  };

  return (
    <Box sx={styles.container}>
      <Accordion
        disabled={isDisabled}
        sx={styles.accordion}
        expanded={expanded}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="success" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" color="success">
            <strong>Comments:</strong> {commentCount}
          </Typography>
        </AccordionSummary>

        <Box sx={styles.accordionDetailsContainer}>
          {comments?.map((comment, index) => (
            <AccordionDetails
              key={comment.id}
              sx={styles.commentItem(index === comments.length - 1)}
            >
              <Comment
                {...comment}
                exhibitId={postId}
                mutateComments={mutateComments}
              />
            </AccordionDetails>
          ))}
        </Box>

        <Box sx={styles.formContainer}>
          <NewCommentForm postId={postId} mutateComments={mutateComments} />
        </Box>
      </Accordion>
    </Box>
  );
};

export default CommentStripe;

