import React, { useState } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "./ResizeHandle";
import styles from "./styles.module.css";
import UserList from "./components/userList";
import UserForm from "./components/userForm";
import UserCardPage from "./components/userCard";

export default function App() {
  const [refreshUserList, setRefreshUserList] = useState(false);

  const handleUserFormSubmit = () => {
    setRefreshUserList(!refreshUserList);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TopRow}>
        <PanelGroup direction="vertical">
          <Panel id="a1" defaultSize={0}></Panel>
          <ResizeHandle />
          <Panel id="a2" className={styles.Panel} order={1}>
            <PanelGroup defaultSize={200} direction="horizontal">
              <Panel
                id="a2"
                className={styles.Panel}
                order={2}
              >
                <PanelGroup direction="horizontal">
                  <Panel id="a1" defaultSize={0}></Panel>
                  <ResizeHandle />
                  <Panel id="a3" defaultSize={25} minSize={20} className={styles.Panel} order={3}>
                    <div className={styles.PanelContent}>
                      <UserList refresh={refreshUserList} />
                    </div>
                  </Panel>
                  <ResizeHandle />
                  <Panel id="a4" minSize={30} className={styles.Panel} order={4}>
                    <div className={styles.PanelContent}>
                      <UserForm onSubmit={handleUserFormSubmit} />
                    </div>
                  </Panel>
                  <ResizeHandle />
                  <Panel id="a6" order={5} defaultSize={0}></Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle />
          <Panel id="a6" className={styles.Panel} order={6}>
            <PanelGroup direction="horizontal">
              <Panel id="a1" defaultSize={0}></Panel>
              <ResizeHandle />
              <Panel id="a3" minSize={55} className={styles.Panel} order={3}>
                <div className={styles.PanelContent}>
                  <UserCardPage refresh={refreshUserList} />
                </div>
              </Panel>
              <ResizeHandle />
              <Panel id="a6" order={5} defaultSize={0}></Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle />
          <Panel defaultSize={0} order={7}></Panel>
        </PanelGroup>
      </div>
    </div >
  );
}
