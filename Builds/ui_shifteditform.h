/********************************************************************************
** Form generated from reading UI file 'shifteditform.ui'
**
** Created by: Qt User Interface Compiler version 5.10.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SHIFTEDITFORM_H
#define UI_SHIFTEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateTimeEdit>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTimeEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ShiftEditForm
{
public:
    QGridLayout *gridLayout;
    QTabWidget *tabWidget;
    QWidget *tab_3;
    QGridLayout *gridLayout_2;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QWidget *left;
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout_3;
    QDateTimeEdit *DateTime1;
    QHBoxLayout *horizontalLayout_11;
    QDateTimeEdit *DateTime2;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_3;
    QComboBox *Name;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_4;
    QComboBox *Projects;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_5;
    QComboBox *Items;
    QHBoxLayout *horizontalLayout_10;
    QLabel *Description_label;
    QLineEdit *Description;
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_7;
    QTimeEdit *Times;
    QHBoxLayout *horizontalLayout_7;
    QSpacerItem *horizontalSpacer_2;
    QPushButton *Add;
    QPushButton *Edit;
    QPushButton *Delete;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_6;
    QTimeEdit *Lunch;
    QWidget *right;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QWidget *bottom;
    QHBoxLayout *horizontalLayout_2;
    QLabel *timeAllocated;
    QLabel *label;
    QLabel *timeTotal;
    QSpacerItem *horizontalSpacer_3;
    QLabel *error;
    QSpacerItem *horizontalSpacer;
    QPushButton *RefreshButton;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;
    QWidget *tab_4;
    QGridLayout *gridLayout_4;
    QWidget *smallwidger;
    QGridLayout *gridLayout_3;
    QSpacerItem *verticalSpacer;
    QSpacerItem *horizontalSpacer_4;
    QSpacerItem *horizontalSpacer_5;
    QVBoxLayout *verticalLayout_4;
    QComboBox *ClockinName;
    QDateTimeEdit *ClockinDateTime;
    QSpacerItem *verticalSpacer_3;
    QWidget *bottom2;
    QHBoxLayout *horizontalLayout_12;
    QSpacerItem *horizontalSpacer_6;
    QPushButton *FinishButton2;
    QPushButton *CancelButton2;

    void setupUi(QWidget *ShiftEditForm)
    {
        if (ShiftEditForm->objectName().isEmpty())
            ShiftEditForm->setObjectName(QStringLiteral("ShiftEditForm"));
        ShiftEditForm->resize(1048, 493);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ShiftEditForm->setFont(font);
        ShiftEditForm->setStyleSheet(QLatin1String("QWidget#ShiftEditForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"}\n"
"\n"
"\n"
"\n"
"QStackedWidget{\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"\n"
"\n"
"QWidget{\n"
"\n"
"margin:0px;\n"
"padding:0px;\n"
"}\n"
"QWidget#bigwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"QWidget#smallwidger{\n"
"background-color:#E5EAE7;\n"
"border:none;\n"
"}\n"
"\n"
"QTableWidget{\n"
"border:none;\n"
"}\n"
"QTextEdit{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#D1D1D1;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QDateEditTime:hover{\n"
"border:none;\n"
"background-color:#F4F9F6;\n"
"}\n"
"QDateEditTime::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"}\n"
"QComboBox:hover {\n"
"background-co"
                        "lor:#D1D1D1;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"QRadioButton{\n"
"padding:0px;\n"
"margin:0px;\n"
"}\n"
"\n"
"\n"
"QGroupBox {\n"
"    border: 0px solid gray;\n"
"	\n"
"    margin-top: 0.5em;\n"
"	margin-right:0px;\n"
"	margin-left:0px;\n"
"}\n"
"QGroupBox::title {\n"
"    subcontrol-origin: margin;\n"
"    left: 10px;\n"
"    padding: 0 3px 0 3px;\n"
"}\n"
"\n"
"\n"
"QCheckBox::indicator,QRadioButton::indicator{\n"
"border:none;\n"
"background-color:#FFFFFF;\n"
"\n"
"}\n"
"\n"
"QCheckBox::indicator:checked,QRadioButton::indicator:checked{\n"
"border:none;\n"
"background-color:#8DAA91;\n"
"\n"
"}\n"
"QLineEdit,QTimeEdit,QDateEdit,QSpinBox,QDateTimeEdit{ \n"
"background-color:#FFFFFF;\n"
" border: 0px solid #D1D1D1;	\n"
"\n"
"}\n"
"QLineEdit:hover,QTimeEdit:hover,QDateEdit:hover,QSpinBox:hover,QDateTimeEdit:hover{ \n"
"background-color:#FFFFFF;\n"
" border: 1px solid #D1D1D1;	\n"
"}\n"
"\n"
"\n"
""));
        gridLayout = new QGridLayout(ShiftEditForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        tabWidget = new QTabWidget(ShiftEditForm);
        tabWidget->setObjectName(QStringLiteral("tabWidget"));
        tabWidget->setTabPosition(QTabWidget::North);
        tabWidget->setTabShape(QTabWidget::Rounded);
        tab_3 = new QWidget();
        tab_3->setObjectName(QStringLiteral("tab_3"));
        gridLayout_2 = new QGridLayout(tab_3);
        gridLayout_2->setObjectName(QStringLiteral("gridLayout_2"));
        bigwidger = new QWidget(tab_3);
        bigwidger->setObjectName(QStringLiteral("bigwidger"));
        verticalLayout_2 = new QVBoxLayout(bigwidger);
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        left = new QWidget(bigwidger);
        left->setObjectName(QStringLiteral("left"));
        verticalLayout = new QVBoxLayout(left);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        DateTime1 = new QDateTimeEdit(left);
        DateTime1->setObjectName(QStringLiteral("DateTime1"));
        DateTime1->setCalendarPopup(true);

        horizontalLayout_3->addWidget(DateTime1);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_11 = new QHBoxLayout();
        horizontalLayout_11->setObjectName(QStringLiteral("horizontalLayout_11"));
        DateTime2 = new QDateTimeEdit(left);
        DateTime2->setObjectName(QStringLiteral("DateTime2"));
        DateTime2->setCalendarPopup(true);

        horizontalLayout_11->addWidget(DateTime2);


        verticalLayout->addLayout(horizontalLayout_11);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_3 = new QLabel(left);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setMinimumSize(QSize(100, 0));
        label_3->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_4->addWidget(label_3);

        Name = new QComboBox(left);
        Name->setObjectName(QStringLiteral("Name"));
        Name->setMinimumSize(QSize(350, 0));
        Name->setMaximumSize(QSize(350, 16777215));
        Name->setEditable(true);

        horizontalLayout_4->addWidget(Name);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_4 = new QLabel(left);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(100, 0));
        label_4->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_5->addWidget(label_4);

        Projects = new QComboBox(left);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMinimumSize(QSize(350, 0));
        Projects->setMaximumSize(QSize(350, 16777215));
        Projects->setEditable(true);
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        horizontalLayout_5->addWidget(Projects);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_5 = new QLabel(left);
        label_5->setObjectName(QStringLiteral("label_5"));
        label_5->setMinimumSize(QSize(100, 0));
        label_5->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_6->addWidget(label_5);

        Items = new QComboBox(left);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMinimumSize(QSize(350, 0));
        Items->setMaximumSize(QSize(350, 16777215));
        Items->setEditable(true);

        horizontalLayout_6->addWidget(Items);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_10 = new QHBoxLayout();
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        Description_label = new QLabel(left);
        Description_label->setObjectName(QStringLiteral("Description_label"));
        Description_label->setMinimumSize(QSize(100, 0));
        Description_label->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_10->addWidget(Description_label);

        Description = new QLineEdit(left);
        Description->setObjectName(QStringLiteral("Description"));
        Description->setMinimumSize(QSize(350, 0));
        Description->setMaximumSize(QSize(350, 16777215));

        horizontalLayout_10->addWidget(Description);


        verticalLayout->addLayout(horizontalLayout_10);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        label_7 = new QLabel(left);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setMinimumSize(QSize(100, 0));
        label_7->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_9->addWidget(label_7);

        Times = new QTimeEdit(left);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMinimumSize(QSize(350, 0));
        Times->setMaximumSize(QSize(350, 16777215));

        horizontalLayout_9->addWidget(Times);


        verticalLayout->addLayout(horizontalLayout_9);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        horizontalLayout_7->setContentsMargins(-1, -1, 12, -1);
        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_2);

        Add = new QPushButton(left);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(114, 0));
        Add->setMaximumSize(QSize(114, 16777215));
        Add->setFocusPolicy(Qt::StrongFocus);

        horizontalLayout_7->addWidget(Add);

        Edit = new QPushButton(left);
        Edit->setObjectName(QStringLiteral("Edit"));
        Edit->setMinimumSize(QSize(114, 0));
        Edit->setMaximumSize(QSize(114, 16777215));

        horizontalLayout_7->addWidget(Edit);

        Delete = new QPushButton(left);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMinimumSize(QSize(114, 0));
        Delete->setMaximumSize(QSize(114, 16777215));
        Delete->setFocusPolicy(Qt::StrongFocus);

        horizontalLayout_7->addWidget(Delete);


        verticalLayout->addLayout(horizontalLayout_7);

        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        label_6 = new QLabel(left);
        label_6->setObjectName(QStringLiteral("label_6"));
        label_6->setMinimumSize(QSize(100, 0));
        label_6->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_8->addWidget(label_6);

        Lunch = new QTimeEdit(left);
        Lunch->setObjectName(QStringLiteral("Lunch"));
        Lunch->setMinimumSize(QSize(350, 0));
        Lunch->setMaximumSize(QSize(350, 16777215));
        Lunch->setMaximumTime(QTime(1, 0, 0));
        Lunch->setCurrentSection(QDateTimeEdit::HourSection);

        horizontalLayout_8->addWidget(Lunch);


        verticalLayout->addLayout(horizontalLayout_8);


        horizontalLayout->addWidget(left);

        right = new QWidget(bigwidger);
        right->setObjectName(QStringLiteral("right"));
        verticalLayout_3 = new QVBoxLayout(right);
        verticalLayout_3->setObjectName(QStringLiteral("verticalLayout_3"));
        Sections = new QTableWidget(right);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        verticalLayout_3->addWidget(Sections);


        horizontalLayout->addWidget(right);


        verticalLayout_2->addLayout(horizontalLayout);

        bottom = new QWidget(bigwidger);
        bottom->setObjectName(QStringLiteral("bottom"));
        horizontalLayout_2 = new QHBoxLayout(bottom);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        timeAllocated = new QLabel(bottom);
        timeAllocated->setObjectName(QStringLiteral("timeAllocated"));

        horizontalLayout_2->addWidget(timeAllocated);

        label = new QLabel(bottom);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeTotal = new QLabel(bottom);
        timeTotal->setObjectName(QStringLiteral("timeTotal"));

        horizontalLayout_2->addWidget(timeTotal);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_3);

        error = new QLabel(bottom);
        error->setObjectName(QStringLiteral("error"));

        horizontalLayout_2->addWidget(error);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);

        RefreshButton = new QPushButton(bottom);
        RefreshButton->setObjectName(QStringLiteral("RefreshButton"));
        RefreshButton->setMinimumSize(QSize(100, 0));
        RefreshButton->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_2->addWidget(RefreshButton);

        FinishedButton = new QPushButton(bottom);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));
        FinishedButton->setMinimumSize(QSize(100, 0));
        FinishedButton->setMaximumSize(QSize(100, 16777215));
        FinishedButton->setFocusPolicy(Qt::StrongFocus);
        FinishedButton->setAutoDefault(false);

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(bottom);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));
        CancelButton->setMinimumSize(QSize(100, 0));
        CancelButton->setMaximumSize(QSize(100, 16777215));
        CancelButton->setFocusPolicy(Qt::StrongFocus);

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addWidget(bottom);


        gridLayout_2->addWidget(bigwidger, 0, 0, 1, 1);

        tabWidget->addTab(tab_3, QString());
        tab_4 = new QWidget();
        tab_4->setObjectName(QStringLiteral("tab_4"));
        gridLayout_4 = new QGridLayout(tab_4);
        gridLayout_4->setObjectName(QStringLiteral("gridLayout_4"));
        smallwidger = new QWidget(tab_4);
        smallwidger->setObjectName(QStringLiteral("smallwidger"));
        gridLayout_3 = new QGridLayout(smallwidger);
        gridLayout_3->setObjectName(QStringLiteral("gridLayout_3"));
        verticalSpacer = new QSpacerItem(20, 154, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_3->addItem(verticalSpacer, 1, 1, 1, 1);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_3->addItem(horizontalSpacer_4, 2, 0, 1, 1);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        gridLayout_3->addItem(horizontalSpacer_5, 2, 2, 1, 1);

        verticalLayout_4 = new QVBoxLayout();
        verticalLayout_4->setObjectName(QStringLiteral("verticalLayout_4"));
        ClockinName = new QComboBox(smallwidger);
        ClockinName->setObjectName(QStringLiteral("ClockinName"));
        ClockinName->setMinimumSize(QSize(350, 0));
        ClockinName->setEditable(true);

        verticalLayout_4->addWidget(ClockinName);

        ClockinDateTime = new QDateTimeEdit(smallwidger);
        ClockinDateTime->setObjectName(QStringLiteral("ClockinDateTime"));

        verticalLayout_4->addWidget(ClockinDateTime);


        gridLayout_3->addLayout(verticalLayout_4, 2, 1, 1, 1);

        verticalSpacer_3 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout_3->addItem(verticalSpacer_3, 3, 1, 1, 1);

        bottom2 = new QWidget(smallwidger);
        bottom2->setObjectName(QStringLiteral("bottom2"));
        horizontalLayout_12 = new QHBoxLayout(bottom2);
        horizontalLayout_12->setObjectName(QStringLiteral("horizontalLayout_12"));
        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_12->addItem(horizontalSpacer_6);

        FinishButton2 = new QPushButton(bottom2);
        FinishButton2->setObjectName(QStringLiteral("FinishButton2"));
        FinishButton2->setMinimumSize(QSize(100, 0));

        horizontalLayout_12->addWidget(FinishButton2);

        CancelButton2 = new QPushButton(bottom2);
        CancelButton2->setObjectName(QStringLiteral("CancelButton2"));
        CancelButton2->setMinimumSize(QSize(100, 0));

        horizontalLayout_12->addWidget(CancelButton2);


        gridLayout_3->addWidget(bottom2, 4, 0, 1, 3);


        gridLayout_4->addWidget(smallwidger, 0, 0, 1, 1);

        tabWidget->addTab(tab_4, QString());

        gridLayout->addWidget(tabWidget, 0, 1, 1, 1);

        QWidget::setTabOrder(DateTime1, DateTime2);
        QWidget::setTabOrder(DateTime2, Name);
        QWidget::setTabOrder(Name, Projects);
        QWidget::setTabOrder(Projects, Items);
        QWidget::setTabOrder(Items, Description);
        QWidget::setTabOrder(Description, Times);
        QWidget::setTabOrder(Times, Add);
        QWidget::setTabOrder(Add, Edit);
        QWidget::setTabOrder(Edit, Delete);
        QWidget::setTabOrder(Delete, Lunch);
        QWidget::setTabOrder(Lunch, FinishedButton);
        QWidget::setTabOrder(FinishedButton, CancelButton);
        QWidget::setTabOrder(CancelButton, RefreshButton);
        QWidget::setTabOrder(RefreshButton, Sections);

        retranslateUi(ShiftEditForm);

        tabWidget->setCurrentIndex(0);
        FinishedButton->setDefault(false);


        QMetaObject::connectSlotsByName(ShiftEditForm);
    } // setupUi

    void retranslateUi(QWidget *ShiftEditForm)
    {
        ShiftEditForm->setWindowTitle(QApplication::translate("ShiftEditForm", "Shift Edit", nullptr));
        label_3->setText(QApplication::translate("ShiftEditForm", "Name:", nullptr));
        label_4->setText(QApplication::translate("ShiftEditForm", "Project:", nullptr));
        label_5->setText(QApplication::translate("ShiftEditForm", "Task:", nullptr));
        Description_label->setText(QApplication::translate("ShiftEditForm", "Notes:", nullptr));
        label_7->setText(QApplication::translate("ShiftEditForm", "Time Worked:", nullptr));
        Times->setDisplayFormat(QApplication::translate("ShiftEditForm", "hh:mm", nullptr));
        Add->setText(QApplication::translate("ShiftEditForm", "Add", nullptr));
        Edit->setText(QApplication::translate("ShiftEditForm", "Edit", nullptr));
        Delete->setText(QApplication::translate("ShiftEditForm", "Delete", nullptr));
        label_6->setText(QApplication::translate("ShiftEditForm", "Lunch Taken:", nullptr));
        Lunch->setDisplayFormat(QApplication::translate("ShiftEditForm", "hh:mm", nullptr));
        timeAllocated->setText(QString());
        label->setText(QApplication::translate("ShiftEditForm", "/", nullptr));
        timeTotal->setText(QString());
        error->setText(QString());
        RefreshButton->setText(QApplication::translate("ShiftEditForm", "Refresh", nullptr));
        FinishedButton->setText(QApplication::translate("ShiftEditForm", "Finish", nullptr));
        CancelButton->setText(QApplication::translate("ShiftEditForm", "Cancel", nullptr));
        tabWidget->setTabText(tabWidget->indexOf(tab_3), QApplication::translate("ShiftEditForm", "Complete Shift", nullptr));
        FinishButton2->setText(QApplication::translate("ShiftEditForm", "Finish", nullptr));
        CancelButton2->setText(QApplication::translate("ShiftEditForm", "Cancel", nullptr));
        tabWidget->setTabText(tabWidget->indexOf(tab_4), QApplication::translate("ShiftEditForm", "Clockin ", nullptr));
    } // retranslateUi

};

namespace Ui {
    class ShiftEditForm: public Ui_ShiftEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SHIFTEDITFORM_H
