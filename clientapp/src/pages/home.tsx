import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

function Home() {
  return (
    <>
      <div>Description</div>

      <Alert icon={<IconAlertCircle size="1rem" />} title="OK!" color="green">
        <ul>
          <li>I could create the enviroment</li>
          <li>Implemented a lot of APIs</li>
          <li>
            Used pretty UI framework, tried to creat something good for eyes (I
            know it should be backend focus)
          </li>
        </ul>
      </Alert>

      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Problems!"
        color="red"
      >
        <ul>
          <li>
            Before delete - I usually make a Dialog If you really want to delete
            or not, but now I have not enough time
          </li>
          <li>
            I've messed up with delete, because I have not used the isActive
            property (sorry, I should read more carefully)
          </li>
          <li>Missing server side validation - big no -</li>
          <li>
            I had to redesign some of the tasks, because I have not enough
            knowledge but less time than I thought
          </li>
        </ul>
      </Alert>

      <Alert
        icon={<IconAlertCircle size="1rem" />}
        title="Comments"
        color="yellow"
      >
        <ul>
          <li>
            I really enjoyed this task, but it take a lot of time to make it
            work. (especially for a junior position)
          </li>
          <li>I could learn a lot, so thank you 😊</li>
        </ul>
      </Alert>
    </>
  );
}

export default Home;
