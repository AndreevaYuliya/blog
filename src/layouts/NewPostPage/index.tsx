import { FC } from "react";

import PageContainer from "../../components/PageContainer";
import ControlBar from "../../components/ControlBar";
import ContentContainer from "../../components/ContentContainer";
import NewPostForm from "../../components/NewPostForm";

const NewPostPage: FC = () => {
  return (
    <PageContainer>
      <ControlBar title="Create New Post" />

      <ContentContainer>
        <NewPostForm />
      </ContentContainer>
    </PageContainer>
  );
};

export default NewPostPage;
