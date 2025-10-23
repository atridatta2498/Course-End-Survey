import styled from 'styled-components';
<style>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const DmSans = styled.div`
  font-family: "DM Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: ${props => props.weight || 'normal'};
  font-style: normal;
`;
const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(245, 247, 250, 0.1);
`;

const BackgroundVideo = () => {
  return (
    <VideoWrapper>
      <Video autoPlay muted loop playsInline>
        <source src="/5680034-hd_1920_1080_24fps.mp4" type="video/mp4" />
      </Video>
      <Overlay />
    </VideoWrapper>
  );
};

export default BackgroundVideo;