import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import Modal from "../components/Modal";
import { editstudent, viewProfile } from "../api/apiconnection";

const TABLE_HEAD = ["Name", "Email", "Mobile No", "Action"];

export function Homepage() {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [students, setStudents] = useState([]);

  const handleMenuClick = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedItem) => {
    try {
      console.log(updatedItem);
      const response = await editstudent(updatedItem); // Await the editStudent call

      // Update the students state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedItem.id
            ? { ...student, ...updatedItem }
            : student
        )
      );
    } catch (error) {
      console.error("Error editing student:", error.message);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await viewProfile();
        console.log(response, "4444444444");
        setStudents(response);
      } catch (error) {
        console.error("Error fetching student profiles:", error.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <div className={styles.tableHead}>
            {TABLE_HEAD.map((head, index) => (
              <div
                key={head}
                className={styles.tableHeadCell}
                style={{
                  gridColumn: `span ${
                    index === 0 ? 2 : index === 1 ? 5 : index === 2 ? 3 : 2
                  }`,
                }}
              >
                {head}
              </div>
            ))}
          </div>
          <div className={styles.tableBody}>
            {students.map((student) => {
              const { id, fullname, email, mobileno } = student;
              return (
                <div key={id} className={styles.tableRow}>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellName}`}
                  >
                    {fullname}
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellEmail}`}
                  >
                    {email}
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellMobile}`}
                  >
                    {mobileno}
                  </div>
                  <div
                    className={`${styles.tableCell} ${styles.tableCellAction}`}
                  >
                    <button
                      className={styles.menuButton}
                      onClick={() =>
                        handleEditClick({ id, fullname, email, mobileno })
                      }
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Render the modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        currentItem={currentItem || {}}
      />
    </div>
  );
}