import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MainLayout from "@/components/shared/layouts/mainLayout";

import Aside from "./components/aside";
import Header from "./components/header";
import TabsContent from "./components/tabs-content";

import TabHeaderActions from "./components/tab-header-actions";

import { useAppDispatch, useAppSelector } from "@/hooks/useTypedRTK";

import { selectCreatedRooms } from "@/store/selectors/room/created.selector";
import { selectJoinedRooms } from "@/store/selectors/room/joined.selector";
import {
  selectAppAuthenticated,
  selectAppFetchingAssociatedRoomsStatus,
  selectAppUser,
} from "@/store/selectors/app.selector";

import { getAllAssociatedRoomsAsyncAction } from "@/store/actions/app/userActions";

export default function Home() {
  const dispatch = useAppDispatch();

  const [fetchingRooms, setFetchingRooms] = useState(false);

  const status = useAppSelector(selectAppFetchingAssociatedRoomsStatus);
  const createdRooms = useAppSelector(selectCreatedRooms);
  const joinedRooms = useAppSelector(selectJoinedRooms);

  const user = useAppSelector(selectAppUser);
  const authenticated = useAppSelector(selectAppAuthenticated);

  useEffect(() => {
    if (authenticated && user) {
      console.log("Triggered");
      dispatch(getAllAssociatedRoomsAsyncAction());
    }
  }, [authenticated]);

  useEffect(() => {
    if (status == "loading") {
      setFetchingRooms(true);
    } else {
      setFetchingRooms(false);
    }
  }, [status]);

  return (
    <MainLayout>
      <Aside />
      <div className="w-full h-full flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="w-full h-full max-w-[1440px] mx-auto grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="created" className="w-full h-full">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="created">Created</TabsTrigger>
                <TabsTrigger value="joined">Joined</TabsTrigger>
              </TabsList>
              <TabHeaderActions />
            </div>

            <TabsContent
              loading={fetchingRooms}
              value="created"
              title="Created Playgrounds"
              description="This section contains all the rooms that you own/had created."
              rooms={createdRooms}
            />

            <TabsContent
              loading={fetchingRooms}
              value="joined"
              title="Joined Playgrounds"
              description="This section contains all the rooms that you had joined."
              rooms={joinedRooms}
            />
          </Tabs>
        </main>
      </div>
    </MainLayout>
  );
}
