"use client";

import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import { Button, HistoryType, ReadMoreModal, TokenStorageHelper } from "shared";
import { GeneralData, InfoCard, Table } from "widgets";
import { getHistory } from "_pages/history-details/api";
import { useEffect, useState } from "react";
import { AuthRequired } from "processes";

const HistoryDetails = () => {
  const token = TokenStorageHelper.getToken();
  const { historyId } = useParams();
  const router = useRouter();
  // TODO change this after adding get /history/{historyId} endpoint in backend
  const [foundHistoryData, setFoundHistoryData] = useState<HistoryType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isReadMoreModalActive, setIsReadMoreModalActive] = useState(false);

  const handleToggleReadMoreModal = () => {
    setIsReadMoreModalActive((prevState) => !prevState);
  };

  const handleBackClick = () => {
    router.push("/history");
  };

  const findHistoryItemById = async () => {
    setIsLoading(true);
    try {
      const res = await getHistory(token);
      const foundItem = res.find((i) => i.id === parseInt(historyId as string));
      setFoundHistoryData(foundItem);
      setIsLoading(false);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    findHistoryItemById();
  }, []);

  return (
    <AuthRequired>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <Button
              size={"sm"}
              mode={"secondary"}
              className={styles.back_btn}
              onClick={handleBackClick}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112 184 256l144 144"
                ></path>
              </svg>
              <p>Back</p>
            </Button>
          </div>
          {foundHistoryData && (
            <GeneralData
              toggleReadMoreModal={handleToggleReadMoreModal}
              historyData={foundHistoryData}
            />
          )}
          {foundHistoryData?.history_type !== "update" && (
            <div className={styles.info}>
              <InfoCard
                title={"Total added products"}
                value={foundHistoryData?.total_items_count}
                isLoading={isLoading}
              />
              <InfoCard
                title={"Number of unique products"}
                value={foundHistoryData?.total_unique_items_count}
                isLoading={isLoading}
              />
              <InfoCard
                title={"Total cost"}
                value={foundHistoryData?.total_price}
                isLoading={isLoading}
                withCurrency
              />
            </div>
          )}
          <Table
            mode={"afterChange"}
            title={"Changes"}
            afterChangeData={foundHistoryData?.after_change}
            isLoading={isLoading}
            search={false}
            limit={false}
            pagination={false}
          />
          {foundHistoryData?.before_change && (
            <Table
              mode={"beforeChange"}
              title={"Before changes"}
              beforeChangeData={foundHistoryData?.before_change}
              isLoading={isLoading}
              search={false}
              limit={false}
              pagination={false}
            />
          )}
        </div>
        {isReadMoreModalActive && foundHistoryData?.extra_info && (
          <ReadMoreModal
            toggleModal={handleToggleReadMoreModal}
            val={foundHistoryData?.extra_info}
          />
        )}
      </main>
    </AuthRequired>
  );
};

export default HistoryDetails;
