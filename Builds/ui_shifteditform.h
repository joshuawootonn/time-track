/********************************************************************************
** Form generated from reading UI file 'shifteditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SHIFTEDITFORM_H
#define UI_SHIFTEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QCheckBox>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateTimeEdit>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QTimeEdit>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ShiftEditForm
{
public:
    QGridLayout *gridLayout;
    QWidget *bigwidger;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QWidget *left;
    QVBoxLayout *verticalLayout;
    QDateTimeEdit *DateTime1;
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
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_7;
    QTimeEdit *Times;
    QHBoxLayout *horizontalLayout_7;
    QPushButton *Add;
    QPushButton *Delete;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_6;
    QTimeEdit *Lunch;
    QWidget *right;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QWidget *DescriptionWidget;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_2;
    QTextEdit *Description;
    QCheckBox *Description_Check;
    QWidget *bottom;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QLabel *timeLeft;
    QSpacerItem *horizontalSpacer;
    QPushButton *RefreshButton;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ShiftEditForm)
    {
        if (ShiftEditForm->objectName().isEmpty())
            ShiftEditForm->setObjectName(QStringLiteral("ShiftEditForm"));
        ShiftEditForm->resize(853, 454);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ShiftEditForm->setFont(font);
        ShiftEditForm->setStyleSheet(QLatin1String("QWidget#ClockoutForm{\n"
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
"\n"
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
"background-color:#F4F9F6;\n"
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
"background-color:#F4F9F6;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
""
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
""));
        gridLayout = new QGridLayout(ShiftEditForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        bigwidger = new QWidget(ShiftEditForm);
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
        DateTime1 = new QDateTimeEdit(left);
        DateTime1->setObjectName(QStringLiteral("DateTime1"));
        DateTime1->setCalendarPopup(true);

        verticalLayout->addWidget(DateTime1);

        DateTime2 = new QDateTimeEdit(left);
        DateTime2->setObjectName(QStringLiteral("DateTime2"));
        DateTime2->setCalendarPopup(true);

        verticalLayout->addWidget(DateTime2);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_3 = new QLabel(left);
        label_3->setObjectName(QStringLiteral("label_3"));
        label_3->setMinimumSize(QSize(100, 0));
        label_3->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_4->addWidget(label_3);

        Name = new QComboBox(left);
        Name->setObjectName(QStringLiteral("Name"));
        Name->setMinimumSize(QSize(300, 0));
        Name->setMaximumSize(QSize(300, 16777215));
        Name->setEditable(true);

        horizontalLayout_4->addWidget(Name);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_4 = new QLabel(left);
        label_4->setObjectName(QStringLiteral("label_4"));
        label_4->setMinimumSize(QSize(100, 0));
        label_4->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_5->addWidget(label_4);

        Projects = new QComboBox(left);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMinimumSize(QSize(300, 0));
        Projects->setMaximumSize(QSize(300, 16777215));
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
        Items->setMinimumSize(QSize(300, 0));
        Items->setMaximumSize(QSize(300, 16777215));
        Items->setEditable(true);

        horizontalLayout_6->addWidget(Items);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        label_7 = new QLabel(left);
        label_7->setObjectName(QStringLiteral("label_7"));
        label_7->setMinimumSize(QSize(100, 0));
        label_7->setMaximumSize(QSize(100, 16777215));

        horizontalLayout_9->addWidget(label_7);

        Times = new QTimeEdit(left);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMinimumSize(QSize(300, 0));

        horizontalLayout_9->addWidget(Times);


        verticalLayout->addLayout(horizontalLayout_9);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        Add = new QPushButton(left);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setFocusPolicy(Qt::StrongFocus);

        horizontalLayout_7->addWidget(Add);

        Delete = new QPushButton(left);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMaximumSize(QSize(250, 16777215));
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
        Lunch->setMinimumSize(QSize(300, 0));
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

        DescriptionWidget = new QWidget(right);
        DescriptionWidget->setObjectName(QStringLiteral("DescriptionWidget"));
        QSizePolicy sizePolicy(QSizePolicy::Preferred, QSizePolicy::Preferred);
        sizePolicy.setHorizontalStretch(0);
        sizePolicy.setVerticalStretch(0);
        sizePolicy.setHeightForWidth(DescriptionWidget->sizePolicy().hasHeightForWidth());
        DescriptionWidget->setSizePolicy(sizePolicy);
        DescriptionWidget->setMaximumSize(QSize(16777215, 35));
        horizontalLayout_3 = new QHBoxLayout(DescriptionWidget);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_2 = new QLabel(DescriptionWidget);
        label_2->setObjectName(QStringLiteral("label_2"));
        label_2->setMaximumSize(QSize(16777215, 26));

        horizontalLayout_3->addWidget(label_2);

        Description = new QTextEdit(DescriptionWidget);
        Description->setObjectName(QStringLiteral("Description"));
        Description->setMinimumSize(QSize(0, 21));
        Description->setMaximumSize(QSize(16777215, 26));

        horizontalLayout_3->addWidget(Description);

        Description_Check = new QCheckBox(DescriptionWidget);
        Description_Check->setObjectName(QStringLiteral("Description_Check"));
        Description_Check->setTristate(false);

        horizontalLayout_3->addWidget(Description_Check);


        verticalLayout_3->addWidget(DescriptionWidget);


        horizontalLayout->addWidget(right);


        verticalLayout_2->addLayout(horizontalLayout);

        bottom = new QWidget(bigwidger);
        bottom->setObjectName(QStringLiteral("bottom"));
        horizontalLayout_2 = new QHBoxLayout(bottom);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(bottom);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeLeft = new QLabel(bottom);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_2->addWidget(timeLeft);

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


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);

        QWidget::setTabOrder(DateTime1, DateTime2);
        QWidget::setTabOrder(DateTime2, Name);
        QWidget::setTabOrder(Name, Projects);
        QWidget::setTabOrder(Projects, Items);
        QWidget::setTabOrder(Items, Times);
        QWidget::setTabOrder(Times, Add);
        QWidget::setTabOrder(Add, Delete);
        QWidget::setTabOrder(Delete, Lunch);
        QWidget::setTabOrder(Lunch, RefreshButton);
        QWidget::setTabOrder(RefreshButton, FinishedButton);
        QWidget::setTabOrder(FinishedButton, CancelButton);
        QWidget::setTabOrder(CancelButton, Description);
        QWidget::setTabOrder(Description, Sections);
        QWidget::setTabOrder(Sections, Description_Check);

        retranslateUi(ShiftEditForm);

        FinishedButton->setDefault(false);


        QMetaObject::connectSlotsByName(ShiftEditForm);
    } // setupUi

    void retranslateUi(QWidget *ShiftEditForm)
    {
        ShiftEditForm->setWindowTitle(QApplication::translate("ShiftEditForm", "Time-Track", Q_NULLPTR));
        label_3->setText(QApplication::translate("ShiftEditForm", "Name:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ShiftEditForm", "Project:", Q_NULLPTR));
        label_5->setText(QApplication::translate("ShiftEditForm", "Sub-Project:", Q_NULLPTR));
        label_7->setText(QApplication::translate("ShiftEditForm", "Time Worked:", Q_NULLPTR));
        Times->setDisplayFormat(QApplication::translate("ShiftEditForm", "hh:mm", Q_NULLPTR));
        Add->setText(QApplication::translate("ShiftEditForm", "Add", Q_NULLPTR));
        Delete->setText(QApplication::translate("ShiftEditForm", "Delete", Q_NULLPTR));
        label_6->setText(QApplication::translate("ShiftEditForm", "Lunch Taken:", Q_NULLPTR));
        Lunch->setDisplayFormat(QApplication::translate("ShiftEditForm", "hh:mm", Q_NULLPTR));
        label_2->setText(QApplication::translate("ShiftEditForm", "Notes:", Q_NULLPTR));
        Description_Check->setText(QString());
        label->setText(QApplication::translate("ShiftEditForm", "Time Left:", Q_NULLPTR));
        timeLeft->setText(QString());
        RefreshButton->setText(QApplication::translate("ShiftEditForm", "Refresh", Q_NULLPTR));
        FinishedButton->setText(QApplication::translate("ShiftEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ShiftEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ShiftEditForm: public Ui_ShiftEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SHIFTEDITFORM_H
