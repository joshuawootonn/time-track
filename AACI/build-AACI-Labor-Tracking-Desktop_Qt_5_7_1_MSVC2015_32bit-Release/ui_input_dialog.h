/********************************************************************************
** Form generated from reading UI file 'input_dialog.ui'
**
** Created by: Qt User Interface Compiler version 5.7.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_INPUT_DIALOG_H
#define UI_INPUT_DIALOG_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QStackedWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Input_Dialog
{
public:
    QGridLayout *gridLayout;
    QStackedWidget *stackedWidget;
    QWidget *Employee;
    QGridLayout *gridLayout_2;
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout;
    QLabel *Employee_Name_Label;
    QLineEdit *Employee_Name_edit;
    QHBoxLayout *horizontalLayout_4;
    QLabel *Employee_Pin_Label;
    QLineEdit *Employee_Pin_Edit;
    QHBoxLayout *horizontalLayout_3;
    QLabel *Employee_Wage_Label;
    QSpinBox *Employee_Wage_spinBox;
    QHBoxLayout *horizontalLayout_2;
    QCheckBox *Employee_Admin_CheckBox;
    QPushButton *Employee_Finished;
    QPushButton *Employee_Cancel;
    QWidget *Project;
    QVBoxLayout *verticalLayout_2;
    QSpacerItem *verticalSpacer;
    QHBoxLayout *horizontalLayout_5;
    QLabel *Project_Project_Name;
    QLineEdit *Project_Project_Edit;
    QSpacerItem *verticalSpacer_2;
    QHBoxLayout *horizontalLayout_6;
    QPushButton *Project_Finished;
    QPushButton *Project_Cancel;
    QWidget *Item;
    QGridLayout *gridLayout_3;
    QVBoxLayout *verticalLayout_3;
    QComboBox *Item_Combo_0;
    QSpacerItem *verticalSpacer_7;
    QComboBox *Item_Combo_1;
    QSpacerItem *verticalSpacer_5;
    QComboBox *Item_Combo_2;
    QSpacerItem *verticalSpacer_4;
    QComboBox *Item_Combo_3;
    QSpacerItem *verticalSpacer_3;
    QHBoxLayout *horizontalLayout_10;
    QHBoxLayout *horizontalLayout_8;
    QLabel *Item_Time_Label;
    QSpinBox *Item_Time_Spin;
    QHBoxLayout *horizontalLayout_7;
    QLabel *Item_Cost_Label;
    QSpinBox *Item_Cost_Spin;
    QSpacerItem *verticalSpacer_6;
    QHBoxLayout *horizontalLayout_11;
    QPushButton *Item_Finish;
    QPushButton *Item_Cancel;
    QWidget *Timeout;
    QVBoxLayout *verticalLayout_4;
    QLabel *Timeout_label1;
    QLabel *Timeout_label_time;
    QHBoxLayout *horizontalLayout_9;
    QSpacerItem *horizontalSpacer;
    QPushButton *Timeout_button_yes;
    QSpacerItem *horizontalSpacer_2;
    QWidget *Timeout2;
    QVBoxLayout *verticalLayout_9;
    QLabel *Timeout2_label1;
    QLabel *Timeout2_label_time;
    QHBoxLayout *horizontalLayout_23;
    QSpacerItem *horizontalSpacer_6;
    QPushButton *Timeout2_button_yes;
    QSpacerItem *horizontalSpacer_5;

    void setupUi(QDialog *Input_Dialog)
    {
        if (Input_Dialog->objectName().isEmpty())
            Input_Dialog->setObjectName(QStringLiteral("Input_Dialog"));
        Input_Dialog->resize(556, 334);
        Input_Dialog->setMouseTracking(false);
        gridLayout = new QGridLayout(Input_Dialog);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        stackedWidget = new QStackedWidget(Input_Dialog);
        stackedWidget->setObjectName(QStringLiteral("stackedWidget"));
        QFont font;
        font.setFamily(QStringLiteral("Consolas"));
        font.setPointSize(20);
        stackedWidget->setFont(font);
        Employee = new QWidget();
        Employee->setObjectName(QStringLiteral("Employee"));
        gridLayout_2 = new QGridLayout(Employee);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        Employee_Name_Label = new QLabel(Employee);
        Employee_Name_Label->setObjectName(QStringLiteral("Employee_Name_Label"));

        horizontalLayout->addWidget(Employee_Name_Label);

        Employee_Name_edit = new QLineEdit(Employee);
        Employee_Name_edit->setObjectName(QStringLiteral("Employee_Name_edit"));

        horizontalLayout->addWidget(Employee_Name_edit);


        verticalLayout->addLayout(horizontalLayout);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        Employee_Pin_Label = new QLabel(Employee);
        Employee_Pin_Label->setObjectName(QStringLiteral("Employee_Pin_Label"));

        horizontalLayout_4->addWidget(Employee_Pin_Label);

        Employee_Pin_Edit = new QLineEdit(Employee);
        Employee_Pin_Edit->setObjectName(QStringLiteral("Employee_Pin_Edit"));

        horizontalLayout_4->addWidget(Employee_Pin_Edit);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        Employee_Wage_Label = new QLabel(Employee);
        Employee_Wage_Label->setObjectName(QStringLiteral("Employee_Wage_Label"));

        horizontalLayout_3->addWidget(Employee_Wage_Label);

        Employee_Wage_spinBox = new QSpinBox(Employee);
        Employee_Wage_spinBox->setObjectName(QStringLiteral("Employee_Wage_spinBox"));
        Employee_Wage_spinBox->setMinimum(10);
        Employee_Wage_spinBox->setMaximum(50);
        Employee_Wage_spinBox->setSingleStep(5);

        horizontalLayout_3->addWidget(Employee_Wage_spinBox);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        Employee_Admin_CheckBox = new QCheckBox(Employee);
        Employee_Admin_CheckBox->setObjectName(QStringLiteral("Employee_Admin_CheckBox"));

        horizontalLayout_2->addWidget(Employee_Admin_CheckBox);


        verticalLayout->addLayout(horizontalLayout_2);


        gridLayout_2->addLayout(verticalLayout, 0, 0, 1, 2);

        Employee_Finished = new QPushButton(Employee);
        Employee_Finished->setObjectName(QStringLiteral("Employee_Finished"));

        gridLayout_2->addWidget(Employee_Finished, 1, 0, 1, 1);

        Employee_Cancel = new QPushButton(Employee);
        Employee_Cancel->setObjectName(QStringLiteral("Employee_Cancel"));

        gridLayout_2->addWidget(Employee_Cancel, 1, 1, 1, 1);

        stackedWidget->addWidget(Employee);
        Project = new QWidget();
        Project->setObjectName(QStringLiteral("Project"));
        verticalLayout_2 = new QVBoxLayout(Project);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_2->addItem(verticalSpacer);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        Project_Project_Name = new QLabel(Project);
        Project_Project_Name->setObjectName(QStringLiteral("Project_Project_Name"));

        horizontalLayout_5->addWidget(Project_Project_Name);

        Project_Project_Edit = new QLineEdit(Project);
        Project_Project_Edit->setObjectName(QStringLiteral("Project_Project_Edit"));

        horizontalLayout_5->addWidget(Project_Project_Edit);


        verticalLayout_2->addLayout(horizontalLayout_5);

        verticalSpacer_2 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_2->addItem(verticalSpacer_2);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        Project_Finished = new QPushButton(Project);
        Project_Finished->setObjectName(QStringLiteral("Project_Finished"));

        horizontalLayout_6->addWidget(Project_Finished);

        Project_Cancel = new QPushButton(Project);
        Project_Cancel->setObjectName(QStringLiteral("Project_Cancel"));

        horizontalLayout_6->addWidget(Project_Cancel);


        verticalLayout_2->addLayout(horizontalLayout_6);

        stackedWidget->addWidget(Project);
        Item = new QWidget();
        Item->setObjectName(QStringLiteral("Item"));
        gridLayout_3 = new QGridLayout(Item);
        gridLayout_3->setObjectName(QStringLiteral("gridLayout_3"));
        verticalLayout_3 = new QVBoxLayout();
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        Item_Combo_0 = new QComboBox(Item);
        Item_Combo_0->setObjectName(QStringLiteral("Item_Combo_0"));

        verticalLayout_3->addWidget(Item_Combo_0);

        verticalSpacer_7 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_3->addItem(verticalSpacer_7);

        Item_Combo_1 = new QComboBox(Item);
        Item_Combo_1->setObjectName(QStringLiteral("Item_Combo_1"));

        verticalLayout_3->addWidget(Item_Combo_1);

        verticalSpacer_5 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_3->addItem(verticalSpacer_5);

        Item_Combo_2 = new QComboBox(Item);
        Item_Combo_2->setObjectName(QStringLiteral("Item_Combo_2"));

        verticalLayout_3->addWidget(Item_Combo_2);

        verticalSpacer_4 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_3->addItem(verticalSpacer_4);

        Item_Combo_3 = new QComboBox(Item);
        Item_Combo_3->setObjectName(QStringLiteral("Item_Combo_3"));

        verticalLayout_3->addWidget(Item_Combo_3);

        verticalSpacer_3 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_3->addItem(verticalSpacer_3);

        horizontalLayout_10 = new QHBoxLayout();
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        Item_Time_Label = new QLabel(Item);
        Item_Time_Label->setObjectName(QStringLiteral("Item_Time_Label"));

        horizontalLayout_8->addWidget(Item_Time_Label);

        Item_Time_Spin = new QSpinBox(Item);
        Item_Time_Spin->setObjectName(QStringLiteral("Item_Time_Spin"));
        Item_Time_Spin->setMaximum(5000);
        Item_Time_Spin->setSingleStep(5);

        horizontalLayout_8->addWidget(Item_Time_Spin);


        horizontalLayout_10->addLayout(horizontalLayout_8);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        Item_Cost_Label = new QLabel(Item);
        Item_Cost_Label->setObjectName(QStringLiteral("Item_Cost_Label"));

        horizontalLayout_7->addWidget(Item_Cost_Label);

        Item_Cost_Spin = new QSpinBox(Item);
        Item_Cost_Spin->setObjectName(QStringLiteral("Item_Cost_Spin"));
        Item_Cost_Spin->setMaximum(100000);
        Item_Cost_Spin->setSingleStep(100);

        horizontalLayout_7->addWidget(Item_Cost_Spin);


        horizontalLayout_10->addLayout(horizontalLayout_7);


        verticalLayout_3->addLayout(horizontalLayout_10);

        verticalSpacer_6 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout_3->addItem(verticalSpacer_6);

        horizontalLayout_11 = new QHBoxLayout();
        horizontalLayout_11->setObjectName(QStringLiteral("horizontalLayout_11"));
        Item_Finish = new QPushButton(Item);
        Item_Finish->setObjectName(QStringLiteral("Item_Finish"));

        horizontalLayout_11->addWidget(Item_Finish);

        Item_Cancel = new QPushButton(Item);
        Item_Cancel->setObjectName(QStringLiteral("Item_Cancel"));

        horizontalLayout_11->addWidget(Item_Cancel);


        verticalLayout_3->addLayout(horizontalLayout_11);


        gridLayout_3->addLayout(verticalLayout_3, 0, 0, 1, 1);

        stackedWidget->addWidget(Item);
        Timeout = new QWidget();
        Timeout->setObjectName(QStringLiteral("Timeout"));
        verticalLayout_4 = new QVBoxLayout(Timeout);
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        Timeout_label1 = new QLabel(Timeout);
        Timeout_label1->setObjectName(QStringLiteral("Timeout_label1"));
        Timeout_label1->setLayoutDirection(Qt::LeftToRight);
        Timeout_label1->setAlignment(Qt::AlignCenter);

        verticalLayout_4->addWidget(Timeout_label1);

        Timeout_label_time = new QLabel(Timeout);
        Timeout_label_time->setObjectName(QStringLiteral("Timeout_label_time"));
        Timeout_label_time->setAlignment(Qt::AlignCenter);

        verticalLayout_4->addWidget(Timeout_label_time);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_9->addItem(horizontalSpacer);

        Timeout_button_yes = new QPushButton(Timeout);
        Timeout_button_yes->setObjectName(QStringLiteral("Timeout_button_yes"));

        horizontalLayout_9->addWidget(Timeout_button_yes);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_9->addItem(horizontalSpacer_2);


        verticalLayout_4->addLayout(horizontalLayout_9);

        stackedWidget->addWidget(Timeout);
        Timeout2 = new QWidget();
        Timeout2->setObjectName(QStringLiteral("Timeout2"));
        verticalLayout_9 = new QVBoxLayout(Timeout2);
        verticalLayout_9->setObjectName(QStringLiteral("verticalLayout_9"));
        Timeout2_label1 = new QLabel(Timeout2);
        Timeout2_label1->setObjectName(QStringLiteral("Timeout2_label1"));
        Timeout2_label1->setAlignment(Qt::AlignCenter);

        verticalLayout_9->addWidget(Timeout2_label1);

        Timeout2_label_time = new QLabel(Timeout2);
        Timeout2_label_time->setObjectName(QStringLiteral("Timeout2_label_time"));
        Timeout2_label_time->setAlignment(Qt::AlignCenter);

        verticalLayout_9->addWidget(Timeout2_label_time);

        horizontalLayout_23 = new QHBoxLayout();
        horizontalLayout_23->setObjectName(QStringLiteral("horizontalLayout_23"));
        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_23->addItem(horizontalSpacer_6);

        Timeout2_button_yes = new QPushButton(Timeout2);
        Timeout2_button_yes->setObjectName(QStringLiteral("Timeout2_button_yes"));

        horizontalLayout_23->addWidget(Timeout2_button_yes);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_23->addItem(horizontalSpacer_5);


        verticalLayout_9->addLayout(horizontalLayout_23);

        stackedWidget->addWidget(Timeout2);

        gridLayout->addWidget(stackedWidget, 0, 1, 1, 1);


        retranslateUi(Input_Dialog);

        stackedWidget->setCurrentIndex(4);


        QMetaObject::connectSlotsByName(Input_Dialog);
    } // setupUi

    void retranslateUi(QDialog *Input_Dialog)
    {
        Input_Dialog->setWindowTitle(QApplication::translate("Input_Dialog", "Dialog", Q_NULLPTR));
        Employee_Name_Label->setText(QApplication::translate("Input_Dialog", "Full Name:", Q_NULLPTR));
        Employee_Pin_Label->setText(QApplication::translate("Input_Dialog", "PIN(4-digits):", Q_NULLPTR));
        Employee_Wage_Label->setText(QApplication::translate("Input_Dialog", "Wage:", Q_NULLPTR));
        Employee_Admin_CheckBox->setText(QApplication::translate("Input_Dialog", "Admin", Q_NULLPTR));
        Employee_Finished->setText(QApplication::translate("Input_Dialog", "Finished", Q_NULLPTR));
        Employee_Cancel->setText(QApplication::translate("Input_Dialog", "Cancel", Q_NULLPTR));
        Project_Project_Name->setText(QApplication::translate("Input_Dialog", "Project Name:", Q_NULLPTR));
        Project_Finished->setText(QApplication::translate("Input_Dialog", "Finished", Q_NULLPTR));
        Project_Cancel->setText(QApplication::translate("Input_Dialog", "Cancel", Q_NULLPTR));
        Item_Time_Label->setText(QApplication::translate("Input_Dialog", "Est. Time", Q_NULLPTR));
        Item_Cost_Label->setText(QApplication::translate("Input_Dialog", "Est. Cost", Q_NULLPTR));
        Item_Finish->setText(QApplication::translate("Input_Dialog", "Finished", Q_NULLPTR));
        Item_Cancel->setText(QApplication::translate("Input_Dialog", "Cancel", Q_NULLPTR));
        Timeout_label1->setText(QApplication::translate("Input_Dialog", "Do you need more time?(from main)", Q_NULLPTR));
        Timeout_label_time->setText(QString());
        Timeout_button_yes->setText(QApplication::translate("Input_Dialog", "Yes", Q_NULLPTR));
        Timeout2_label1->setText(QApplication::translate("Input_Dialog", "Do you need more time?(from local)", Q_NULLPTR));
        Timeout2_label_time->setText(QString());
        Timeout2_button_yes->setText(QApplication::translate("Input_Dialog", "Yes", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class Input_Dialog: public Ui_Input_Dialog {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_INPUT_DIALOG_H
