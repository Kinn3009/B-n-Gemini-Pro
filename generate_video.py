import time
import os
from google import genai
from google.genai import types

# Khởi tạo client. IDE thường sẽ tự động nhận biến môi trường GOOGLE_API_KEY
# Nếu chưa có, bạn có thể chạy trong terminal: export GOOGLE_API_KEY="your_api_key_here"
client = genai.Client()

prompt = "A breathtaking 4K cinematic promotional video introducing Gemini Pro. Glowing digital nodes connecting to form a neural network, sleek and futuristic floating user interfaces, photorealistic rendering, accompanied by inspiring background music."

print("🚀 Đang gửi yêu cầu tạo video 4K tới mô hình Veo 3.1...")

# Gọi API tạo video
operation = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt=prompt,
    config=types.GenerateVideosConfig(
        aspect_ratio="16:9",
        resolution="4k",
        duration_seconds=8, 
        generate_audio=True  # Veo 3.1 hỗ trợ tạo âm thanh đồng bộ
    )
)

print("⏳ Đang xử lý (Quá trình render video 4K sẽ mất một lúc)...")

# Polling chờ hệ thống tạo xong video
while not operation.done:
    print(".", end="", flush=True)
    time.sleep(15)

print("\n✅ Quá trình render hoàn tất!")

# Trích xuất dữ liệu bytes và lưu thành file .mp4
if hasattr(operation, 'result') and operation.result and operation.result.generated_videos:
    video_bytes = operation.result.generated_videos[0].video.video_bytes
    file_path = "gemini_pro_intro_4k.mp4"
    
    with open(file_path, "wb") as f:
        f.write(video_bytes)
        
    print(f"🎬 Video đã được lưu thành công tại: {os.path.abspath(file_path)}")
else:
    print("❌ Quá trình tạo thất bại (có thể do lỗi kết nối hoặc vi phạm chính sách an toàn).")