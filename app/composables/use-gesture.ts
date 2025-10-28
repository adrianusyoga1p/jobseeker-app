import { Camera } from "@mediapipe/camera_utils";
// import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Hands } from "@mediapipe/hands";
import dayjs from "dayjs";

export function useGestureCamera() {
  const videoRef = ref<HTMLVideoElement | null>(null);
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const photo = ref<string | null>(null);
  const pose = ref<number>(0);
  const warningState = ref<boolean>(false);

  const captureState = ref<number>(0);

  let camera: any = null;
  let hands: any = null;

  const captureTimer = ref<any>(null);
  let warningTimer: any = null;

  const initCamera = async () => {
    const videoEl = videoRef.value!;
    const canvasEl = canvasRef.value!;
    const ctx = canvasEl.getContext("2d")!;

    hands = new Hands({
      locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results: any) => {
      ctx.save();
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);

      if (results.multiHandLandmarks?.length > 0) {
        if (captureState.value !== 3) {
          const landmarks = results.multiHandLandmarks[0];

          const originalHandedness = results.multiHandedness[0].label;

          const correctedHandedness = originalHandedness === "Left" ? "Right" : "Left";

          const detectedPose = detectPose(landmarks, correctedHandedness);
          pose.value = detectedPose;

          handlePoseSequence(detectedPose);

          const color = warningState.value ? "#E11428" : "#008343";

          drawBoundingBox(ctx, landmarks, { color, lineWidth: 5 });

          if (warningState.value) {
            ctx.font = "bold 36px Arial";
            ctx.fillStyle = "#E11428";
            ctx.textAlign = "center";
            ctx.fillText("URUTAN SALAH", canvasEl.width / 2, canvasEl.height / 2 + 60);
          }
        }
        else {
          ctx.font = "bold 48px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("3s... Ambil Pose", canvasEl.width / 2, canvasEl.height / 2);
        }
      }
      else {
        if (captureState.value !== 3) {
          captureState.value = 0;
          if (captureTimer.value) {
            clearTimeout(captureTimer.value);
            captureTimer.value = null;
          }
        }
      }

      ctx.restore();
    });

    camera = new Camera(videoEl, {
      onFrame: async () => {
        await hands.send({ image: videoEl });
      },
      width: 840,
      height: 480,
    });

    camera.start();
  };

  function handlePoseSequence(detectedPose: number) {
    const delay = 3000;
    const warningDelay = 1000;

    if (captureState.value === 3) {
      return;
    }

    if (warningState.value && !warningTimer) {
      warningState.value = false;
    }

    if (captureTimer.value) {
      clearTimeout(captureTimer.value);
      captureTimer.value = null;
      captureState.value = 0;
    }

    if (captureState.value === 0 && detectedPose === 1) {
      captureState.value = 1;
    }
    else if (captureState.value === 1 && detectedPose === 2) {
      captureState.value = 2;
    }
    else if (captureState.value === 2 && detectedPose === 3) {
      captureState.value = 3;

      captureTimer.value = setTimeout(() => {
        captureImage();
        captureTimer.value = null;
        captureState.value = 0;
      }, delay);
    }
    else if (captureState.value !== detectedPose) {
      const expectedPose = captureState.value + 1;

      if (detectedPose !== expectedPose && detectedPose !== 1) {
        warningState.value = true;

        if (warningTimer)
          clearTimeout(warningTimer);
        warningTimer = setTimeout(() => {
          warningState.value = false;
          warningTimer = null;
        }, warningDelay);

        captureState.value = 0;
      }
      else if (detectedPose === 1) {
        captureState.value = 1;
      }
      else {
        captureState.value = 0;
      }
    }
  }

  function detectPose(landmarks: any, handedness: string): number {
    const tips: any[] = [8, 12, 16, 20];
    let count = 0;

    for (let i = 0; i < tips.length; i++) {
      if (landmarks[tips[i]].y < landmarks[tips[i] - 2].y) {
        count++;
      }
    }
    if (handedness === "Right") {
      if (landmarks[4].x > landmarks[3].x) {
        count++;
      }
    }
    else if (handedness === "Left") {
      if (landmarks[4].x < landmarks[3].x) {
        count++;
      }
    }

    return count;
  }

  function drawBoundingBox(ctx: CanvasRenderingContext2D, landmarks: any, style: { color: string; lineWidth: number }) {
    if (!landmarks || landmarks.length === 0)
      return;

    const canvas = canvasRef.value;
    if (!canvas) {
      return;
    }

    const canvasWidth = canvasRef.value!.width;
    const canvasHeight = canvasRef.value!.height;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const landmark of landmarks) {
      const x = landmark.x * canvasWidth;
      const y = landmark.y * canvasHeight;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    ctx.strokeStyle = style.color;
    ctx.lineWidth = style.lineWidth;

    ctx.strokeRect(minX, minY, width, height);

    ctx.font = "bold 16px Arial";
    ctx.fillStyle = style.color;
    ctx.textAlign = "left";
    ctx.fillText(`Pose: ${pose.value}`, minX, minY - 5);
  }

  function captureImage() {
    const video = videoRef.value;
    if (!video)
      return;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    photo.value = tempCanvas.toDataURL("image/png");
  }

  async function saveImage() {
    if (!photo.value)
      return;
    const fileName = `photo_profile_${dayjs().toISOString()}.png`;
    const imageBlob = useToBlob(photo.value);

    const imageFile = new File([imageBlob], fileName, { type: imageBlob.type });
    const response = await uploadMedia(imageFile);

    if (response && response.ok) {
      const data = await response.json();
      return data.secure_url;
    }
    else {
      console.error("Failed to upload image to Cloudinary.");
    }
  }

  function retakeImage() {
    if (camera) {
      camera.stop();
      camera = null;
    }
    if (hands) {
      hands.close();
      hands = null;
    }

    photo.value = null;
    pose.value = 0;
  }

  watch(photo, (newPhoto) => {
    if (newPhoto === null) {
      nextTick(() => {
        initCamera();
      });
    }
  }, { immediate: true });

  onBeforeUnmount(() => {
    if (camera)
      camera.stop();
    if (hands)
      hands.close();
    if (warningTimer)
      clearTimeout(warningTimer);
    if (captureTimer.value)
      clearTimeout(captureTimer.value);
  });

  return {
    videoRef,
    canvasRef,
    pose,
    photo,
    saveImage,
    retakeImage,
    captureTimer,
  };
}
