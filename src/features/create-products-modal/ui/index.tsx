import styles from "./styles.module.scss";
import { IProps } from "./props";
import { Button, Input, RequiredStar } from "shared";
import classNames from "classnames";

export const CreateProductsModal = ({
  toggleModal,
  isLoading,
  handleSubmit,
  createdProductsData,
  removeClick,
  addMore,
  productDataChange,
}: IProps) => {
  return (
    <div className={styles.container} onClick={toggleModal}>
      <div
        className={classNames(styles.content, "space-y-6")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <p>Add product</p>
          <Button
            size="sm"
            mode="icon"
            className={styles.close}
            onClick={toggleModal}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M368 368 144 144m224 0L144 368"
              ></path>
            </svg>
          </Button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputs_container}>
            <div className={styles.labels}>
              <label className={styles.fullWidth} htmlFor="name">
                <p>
                  Name
                  <RequiredStar />
                </p>
              </label>
              <label className={styles.halfWidth} htmlFor="price">
                <p>
                  Price
                  <RequiredStar />
                </p>
              </label>
              <label className={styles.halfWidth} htmlFor="quantity">
                <p>
                  Quantity
                  <RequiredStar />
                </p>
              </label>
              {createdProductsData.length > 1 && <div className="w-[36px]" />}
            </div>
            {createdProductsData.map((p) => (
              <div key={p.id} className={styles.inputsWithRemove}>
                <div className={classNames(styles.inputs)}>
                  <Input
                    className={styles.fullWidth}
                    required
                    isLoading={isLoading}
                    id={`name_${p.id}`}
                    value={p.name}
                    onChange={(e) =>
                      productDataChange(p.id, "name", e.target.value)
                    }
                  />
                  <Input
                    className={styles.halfWidth}
                    required
                    isLoading={isLoading}
                    type="number"
                    id={`quantity_${p.id}`}
                    value={p.quantity}
                    onChange={(e) =>
                      productDataChange(p.id, "quantity", e.target.value)
                    }
                  />
                  <Input
                    className={styles.halfWidth}
                    required
                    isLoading={isLoading}
                    type="number"
                    id={`price_${p.id}`}
                    value={p.price}
                    onChange={(e) =>
                      productDataChange(p.id, "price", e.target.value)
                    }
                  />
                </div>
                {createdProductsData.length > 1 && (
                  <Button
                    type="button"
                    mode="icon"
                    disabled={isLoading}
                    className={styles.removeBtn}
                    onClick={() => removeClick(p.id)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="32"
                        d="M80 112h352"
                      ></path>
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224"
                      ></path>
                    </svg>
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              mode="ghost"
              disabled={isLoading}
              className={styles.addBtn}
              onClick={addMore}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="16px"
                width="16px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 112v288m144-144H112"
                ></path>
              </svg>
              <p>More</p>
            </Button>
          </div>
          <Button disabled={isLoading} size="md">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
