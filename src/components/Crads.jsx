export default function Crads() {
  return (
    <div>
      {[].map(({ name, description, brand }) => {
        return (
          <div key={name}>
            <h3>{brand}</h3>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}
