import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  getPasswordFromStorage,
  getWebsiteListFromStorage,
  getTimeFromStroage,
} from "./utils/service";

const App = () => {
  const [password, setPassword] = useState<string>("");

  const removeDomainName = async (site: string, origin: string) => {
    try {
      const weblists = await getWebsiteListFromStorage();
      const updatedWeblists = weblists.filter((i: any) => i !== site);
      await chrome.storage.sync.set({ websites: updatedWeblists });
      toast.success(`${site} removed!`);

      // timer
      const times = await getTimeFromStroage();
      const minute = parseInt(times.split(":")[0]);
      const second = parseInt(times.split(":")[1]);
      let totalSecond = minute * 60 + second;
      chrome.tabs.update({ url: origin });
      const messageDetails = {
        origin,
        domain: site,
        totalSecond,
      };
      chrome.runtime.sendMessage(messageDetails);
    } catch (error) {
      if (error) {
        const times = `05:00`;
        try {
          await chrome.storage.sync.set({ times });
          toast.success(`Default ${times} time added!`);
        } catch (error) {
          if (error) {
            toast.error("Fail to set time!");
          }
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  const unlockBtn = async () => {
    if (!password) return toast.error("Enter the password!");

    try {
      const storagePassword = await getPasswordFromStorage();
      if (storagePassword === password) {
        const url = new URL(window.location.href);
        const site = url.searchParams.get("site");
        const origin = url.searchParams.get("origin");
        if (site && origin) {
          removeDomainName(site as string, origin as string);
        }
      } else {
        toast.error("Password is wrong!");
      }
    } catch (error) {
      if (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const gotoOptionsPage = () => {
    chrome.tabs.create({ url: "./src/options/index.html" });
  };
  return (
    <Box
      w="full"
      h="100vh"
      bg="linear-gradient(rgba(20, 50, 5, 0.8) 30%, rgba(8, 80, 51, 0.8))"
      // bgImage={"https://source.unsplash.com/random"}
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box bg="#09081021" h="full" w="full">
        <HStack justify="space-between" w="full" p={10}>
          <Image src="/icon.png" w="20" h="20" alt="logo" />
          <Icon
            cursor="pointer"
            onClick={gotoOptionsPage}
            as={MdSettings}
            fontSize="4xl"
            color="white"
          />
        </HStack>
        <Center w="full" h={"50vh"}>
          <Flex
            backdropFilter="blur(20px)"
            rounded="3xl"
            p={10}
            shadow="2xl"
            flexDir="column"
            align="center"
          >
            <Heading fontSize="4xl" color="white">
              This website blocked by WEBSITE BLOCKER
            </Heading>
            <Text fontSize="2xl" color="green.500" fontWeight="bold">
              Enter the password to unlock this website
            </Text>
            <VStack mt={10}>
              <Input
                bg="transparent"
                color="white"
                fontWeight="bold"
                type="text"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={unlockBtn}
                variant="outline"
                colorScheme="messenger"
              >
                Unlock
              </Button>
            </VStack>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
};

export default App;
