import FooterLayout from "~/layouts/FooterLayout";
import HeaderLayout from "~/layouts/HeaderLayout";

function AboutPage() {
  return (
    <div>
      <HeaderLayout />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="bg-slate-100 py-4 px-44">
        <div className="text-center font-bold mt-10">
          Giới thiệu về Ganimeshop
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="font-bold">Thông tin liên hệ</div>
            <div className="mt-4">
              <div>
                Ra đời từ 2014, thương hiệu thời trang nam 360 xác định sứ mệnh
                giúp các chàng trai trở nên đẹp hơn với phiên bản của chính
                mình. Ngày nay nam giới trẻ đang đứng những cơ hội tuyệt vời của
                xã hội hiện đại, công nghệ thông tin phát triển, cuộc cách mạng
                của các trang mạng xã hội để khẳng định bản thân. Bên cạnh đó,
                360 hiểu rằng người trẻ cũng đang phải đối diện với những áp
                lực, thử thách thôi thúc bản thân phải thể hiên mình so với
                những người khác.
              </div>
              <div className="mt-4">
                Với mong muốn được đồng hành, truyền cảm hứng và khuyến khích
                các bạn nam giới trẻ dám bước ra khỏi vùng an toàn để tự do, tự
                tin thể hiện chính mình theo phong cách phù hợp với bản thân.
                Thương hiệu thời trang 360 đầu tư tâm huyết nghiên cứu thiết kế
                chi tiết từng sản phẩm để có thể mang lại những trải nghiệm mới
                cho khách hàng, cũng là thông điệp muốn nhắn nhủ đến các bạn trẻ
                hãy cho bản thân trải nghiệm, dám thay đổi, bứt phá để vươn lên.
                Chúng ta chỉ thực sự thay đổi khi chúng ta hành động. 360 tin
                rằng dù có thể thành công hay thất bại, nhưng chắc chắn chỉ có
                những trải nghiệm mới giúp bạn trưởng thành. Trưởng thành là một
                hành trình với những dấu mốc thanh xuân, để khi nhìn lại tôi và
                bạn có thể tự tin không phải nuối tiếc “giá như…”
              </div>
              <div className="mt-4">
                Mỗi bạn trẻ là một phiên bản độc đáo và duy nhất.
              </div>
            </div>
          </div>
          <div className="p-8">
            <img
              src="https://bloganchoi.com/wp-content/uploads/2022/07/shop-quan-ao.jpg"
              alt="about"
              className="w-full rounded-md"
            />
          </div>
        </div>
      </div>
      <FooterLayout />
    </div>
  );
}

export default AboutPage;
