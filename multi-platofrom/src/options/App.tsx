import Browser from "webextension-polyfill";
import {
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdDelete, MdSaveAs } from "react-icons/md";
import { toast } from "react-hot-toast";

const OpApp = () => {
  const [website, setWebsite] = useState<string>("");
  const [weblists, setWeblists] = useState<Array<any>>([]);
  const [prevPassword, setPrevPassword] = useState<string>("");
  const [pass1, setPass1] = useState<string>("");
  const [pass2, setPass2] = useState<string>("");
  const [pass3, setPass3] = useState<string>("");
  // time pannel
  const [minute, setMinute] = useState<string>("");
  const [second, setSecond] = useState<string>("");

  const addWebsite = async () => {
    if (!website) return toast.error("Please input website URL!");
    try {
      const { websites: oldArray }: any = await Browser.storage.sync.get(
        "websites"
      );
      console.log("old array: ", oldArray);

      const newLists: any = [...(oldArray || ""), website];
      await Browser.storage.sync.set({ websites: newLists });
      setWeblists(newLists as any);
      setWebsite("");
      toast.success(`${website} added to block list!`);
    } catch (error) {
      if (error) return toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    const getWebLists = async () => {
      const { websites } = await Browser.storage.sync.get("websites");
      setWeblists(websites || []);
    };
    const getPrevPassword = async () => {
      const { password } = await Browser.storage.sync.get("password");
      if (password) setPrevPassword(password);
    };
    const getTimeFromStorage = async () => {
      const { times } = await Browser.storage.sync.get("times");
      if (times) {
        setMinute(times.split(":")[0]);
        setSecond(times.split(":")[1]);
      }
    };
    getPrevPassword();
    getWebLists();
    getTimeFromStorage();
  }, []);

  const removeItem = async (item: string) => {
    const updatedWeblists = weblists.filter((i) => i !== item);
    setWeblists(updatedWeblists);
    await Browser.storage.sync.set({ websites: updatedWeblists });
    toast.success(`${item} removed!`);
  };

  const handleChange = () => {
    if (prevPassword) {
      if (prevPassword !== pass1) {
        return toast.error("Password doesn't match.");
      }
      if (pass2 !== pass3) return toast.error("Not match!");
      Browser.storage.sync
        .set({ password: pass3 })
        .then(() => toast.success(`"${pass3}" is now master password!`));
    } else {
      if (pass2 !== pass3) return toast.error("Not match!");
      Browser.storage.sync
        .set({ password: pass3 })
        .then(() => toast.success(`"${pass3}" is now master password!`));
    }
  };

  const saveTime = async () => {
    if (!minute || !second) return toast.error("Please input minute & second!");
    const times = `${minute}:${second}`;
    try {
      await Browser.storage.sync.set({ times });
      toast.success(`Time is added! ${times}`);
    } catch (error) {
      if (error) {
        toast.error("Fail to set time!");
      }
    }
  };

  return (
    <Center mt={7} w="full">
      <VStack boxShadow="md" w="container.sm" rounded="xl" p={8}>
        <Heading fontSize="2xl" fontWeight="semibold" pb={3}>
          Setup Extension
        </Heading>
        <Tabs w="full">
          <TabList>
            <Tab>Blocked Websites</Tab>
            <Tab>Add New</Tab>
            <Tab>Settings</Tab>
            <Tab>Timer Setup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel w="full">
              <Stack spacing={2}>
                {weblists &&
                  weblists.map((item) => (
                    <HStack
                      key={item}
                      bg="gray.100"
                      shadow="md"
                      w="full"
                      justify="space-between"
                    >
                      <Text fontWeight="semibold" px="2" fontSize="md">
                        {item}
                      </Text>
                      <IconButton
                        onClick={() => removeItem(item)}
                        aria-label="removeBtn"
                        icon={<MdClose />}
                      />
                    </HStack>
                  ))}
              </Stack>
            </TabPanel>
            <TabPanel w="full">
              <HStack>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="example.com"
                  type="text"
                />
                <IconButton
                  onClick={addWebsite}
                  aria-label="addBtn"
                  icon={<MdAdd />}
                />
              </HStack>
            </TabPanel>
            <TabPanel w="full">
              <Stack w="full">
                {prevPassword ? (
                  <>
                    <Input
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                      type="password"
                      placeholder="Previous password"
                    />
                    <Divider my={3} />
                  </>
                ) : null}
                <Input
                  type="password"
                  value={pass2}
                  onChange={(e) => setPass2(e.target.value)}
                  placeholder="New password"
                />
                <Input
                  onChange={(e) => setPass3(e.target.value)}
                  type="password"
                  placeholder="Confirm password"
                  value={pass3}
                />

                <Flex justify="flex-end" w="full" mt={3}>
                  <Button onClick={handleChange}>Save changes</Button>
                </Flex>
              </Stack>
            </TabPanel>
            <TabPanel w="full">
              <Stack w="full" flexDir="row">
                <Input
                  textAlign="center"
                  type="number"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  fontWeight="semibold"
                />
                <Input
                  textAlign="center"
                  onChange={(e) => setSecond(e.target.value)}
                  type="number"
                  value={second}
                  fontWeight="semibold"
                />
                <Stack flexDir="row">
                  <IconButton
                    onClick={() => {
                      setMinute("");
                      setSecond("");
                    }}
                    colorScheme="orange"
                    aria-label="clearBtn"
                    icon={<MdDelete />}
                  />
                  <IconButton
                    aria-label="saveBtn"
                    onClick={saveTime}
                    colorScheme="telegram"
                    icon={<MdSaveAs />}
                  />
                </Stack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Center>
  );
};

export default OpApp;
