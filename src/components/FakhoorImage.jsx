function FakhoorImage() {
    return (
      <picture className="w-full max-w-2xl mx-auto">
        <source srcSet="/homePhoto.webp" type="image/webp" />
        <img src="/homePhoto.jpg" alt="Fakhoor" />
      </picture>
    );
  }
  
  export default FakhoorImage;