import { FC } from "react";

import { Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { object, string } from "yup";

import Container from "../../components/Container";
import Header from "../../components/Header";

import { StyledField } from "../../styles";

const PostSchema = object({
  title: string()
    .required("Title is required")
    .max(50, "Title cannot exceed 50 characters"),
  content: string()
    .required("Content is required")
    .min(100, "Content must be at least 100 characters"),
});

const NewPostPage: FC = () => {
  return (
    <Container>
      <Header title="Create New Post" />

      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={PostSchema}
        onSubmit={(values) => {
          console.log("New Post Submitted:", values);
        }}
      >
        {({ isSubmitting, isValid, dirty, submitForm }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
              borderRadius: 10,
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              padding: 20,
              width: "85%",
              marginTop: 50,
            }}
          >
            <StyledField
              component={TextField}
              name="title"
              type="text"
              label="Title"
              placeholder="Enter title"
              overflow="hidden"
            />

            <StyledField
              component={TextField}
              name="content"
              type="text"
              label="Content"
              placeholder="Enter content"
              multiline
              rows={20}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isSubmitting || !isValid || !dirty}
              sx={{ height: 45, boxSizing: "border-box" }}
              onClick={submitForm}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="button">Save</Typography>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewPostPage;
