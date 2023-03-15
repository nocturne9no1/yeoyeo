import GridHomeImage from "@images/intro/grid_home.jpg";
import GridServiceImage from "@images/intro/grid_service.jpg";
import GridRoomImage from "@images/intro/grid_room.jpg";
import GridReservationImage from "@images/intro/grid_reservation.jpg";

interface GridItemType {
  itemType: string;
}
function GridItem({ itemType }: GridItemType) {
  function imageHandler(imageType: string) {
    switch (imageType) {
      case "home":
        return GridHomeImage;
      case "service":
        return GridServiceImage;
      case "room1":
        return GridRoomImage;
      case "room2":
        return GridRoomImage;
      case "reservation":
        return GridReservationImage;
      default:
        return "https://picsum.photos/200/300";
    }
  }
  return (
    <button
      type="button"
      className={`grid-item ${itemType} snip1273`}
      onClick={() => {
        console.log("click");
      }}
    >
      <img src={imageHandler(itemType)} alt="" />
      <figcaption>
        <h3>Fletch Skinner</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta recusandae officia autem quia consectetur
          delectus quibusdam laudantium omnis a.
        </p>
      </figcaption>
    </button>
  );
}

function GridRouting() {
  return (
    <div className="grid-container">
      <GridItem itemType="home" />
      <GridItem itemType="service" />
      <GridItem itemType="room1" />
      <GridItem itemType="room2" />
      <GridItem itemType="reservation" />
      <GridItem itemType="way-to-home" />
    </div>
  );
}

export default GridRouting;
