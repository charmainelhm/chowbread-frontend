const Illustration = ({ webpSrc, fallbackSrc, credits, mode }) => {
  return (
    <>
      <picture>
        <source type="image/webp" srcSet={webpSrc} />
        <source type="image/png" srcSet={fallbackSrc} />
        <img src={fallbackSrc} alt="Lady eating pasta" />
      </picture>
      <a
        className={`${
          mode === "dark" ? "text-white" : "text-slate-500"
        } font-normal text-xs`}
        href={credits.ref}
      >
        {credits.text}
      </a>
    </>
  );
};

export default Illustration;
