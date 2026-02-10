import { FC, useRef } from "react";
import { useSearchParams } from "react-router";

import { useRequest } from "ahooks";

import { useAlertContext } from "../../providers/AlertContext";
import { GetExhibitsResponse } from "../../types/ExhibitsApi";
import Post from "../../components/Post";
import ControlBar from "../../components/ControlBar";
import PageContainer from "../../components/PageContainer";
import ContentContainer from "../../components/ContentContainer";
import Pagination from "../../components/Pagination";
import { getMyPosts } from "../../api/exhibitActions";
import Backdrop from "../../components/Backdrop";

const StripePage: FC = () => {
  const [searchParams] = useSearchParams();

  const { showAlert } = useAlertContext();

  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);
  const limit = 10;

  const {
    data: posts,
    loading: isLoading,
    mutate: mutatePosts,
  } = useRequest(() => getMyPosts(pageFromParams, limit), {
    refreshDeps: [pageFromParams],
    onFinally: () => handleScrollTop(),
    onError: (error) => {
      showAlert(`Error loading posts: ${error.message}`, "error");
    },
  });

  const total = posts?.total || 0;

  const contentRef = useRef<HTMLDivElement>(null);

  const mutatePostsSafe = (
    updater: (prev: GetExhibitsResponse | null) => GetExhibitsResponse | null,
  ) => {
    mutatePosts((prev) => updater(prev ?? null));
  };

  const handleScrollTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  };

  return (
    <PageContainer>
      <ControlBar title="Stripe Page" handleScrollTop={handleScrollTop} />

      <ContentContainer ref={contentRef}>
        {isLoading && <Backdrop />}

        {posts?.data.map((post, index) => (
          <Post
            key={post.id}
            {...post}
            isFirstPost={index === 0}
            isLastPost={index === posts.data.length - 1}
            mutatePosts={mutatePostsSafe}
          />
        ))}
      </ContentContainer>

      <Pagination total={total} limit={limit} />
    </PageContainer>
  );
};

export default StripePage;
