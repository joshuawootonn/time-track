/********************************************************************************
** Form generated from reading UI file 'shifteditform.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
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
#include <QtWidgets/QPushButton>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QTextEdit>
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
    QComboBox *Name;
    QComboBox *Projects;
    QComboBox *Items;
    QComboBox *Times;
    QComboBox *Lunch;
    QPushButton *Add;
    QPushButton *Delete;
    QWidget *right;
    QVBoxLayout *verticalLayout_3;
    QTableWidget *Sections;
    QWidget *DescriptionWidget;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_2;
    QTextEdit *Description;
    QWidget *bottom;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QLabel *timeLeft;
    QPushButton *RefreshButton;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ShiftEditForm)
    {
        if (ShiftEditForm->objectName().isEmpty())
            ShiftEditForm->setObjectName(QStringLiteral("ShiftEditForm"));
        ShiftEditForm->resize(648, 383);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        ShiftEditForm->setFont(font);
        ShiftEditForm->setStyleSheet(QLatin1String("QWidget#ShiftEditForm{\n"
"\n"
"background-color:#E5EAE7;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 14px;\n"
"\n"
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
"background-color:#FFFFFF;\n"
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
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover:!pressed{\n"
"background-color:#E4E9EB;\n"
"}\n"
"\n"
"\n"
"QDateTimeEdit{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QDateTimeEdit:hover{\n"
"border:none;\n"
"background-color:#E4E9EB;\n"
"}\n"
"QDateTimeEdit::drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"\n"
"QComboBox{\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QComboBox:hover {\n"
"background-color:#E4E9EB;\n"
"}\n"
"QComboBox:drop-down{\n"
"border:none;\n"
"}\n"
"\n"
"\n"
"Q"
                        "RadioButton{\n"
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

        Name = new QComboBox(left);
        Name->setObjectName(QStringLiteral("Name"));

        verticalLayout->addWidget(Name);

        Projects = new QComboBox(left);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMaximumSize(QSize(250, 16777215));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        verticalLayout->addWidget(Projects);

        Items = new QComboBox(left);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Items);

        Times = new QComboBox(left);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Times);

        Lunch = new QComboBox(left);
        Lunch->setObjectName(QStringLiteral("Lunch"));

        verticalLayout->addWidget(Lunch);

        Add = new QPushButton(left);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(250, 0));
        Add->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Add);

        Delete = new QPushButton(left);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Delete);


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
        Description->setMaximumSize(QSize(16777215, 26));

        horizontalLayout_3->addWidget(Description);


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

        RefreshButton = new QPushButton(bottom);
        RefreshButton->setObjectName(QStringLiteral("RefreshButton"));

        horizontalLayout_2->addWidget(RefreshButton);

        FinishedButton = new QPushButton(bottom);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(bottom);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addWidget(bottom);


        gridLayout->addWidget(bigwidger, 0, 0, 1, 1);


        retranslateUi(ShiftEditForm);

        QMetaObject::connectSlotsByName(ShiftEditForm);
    } // setupUi

    void retranslateUi(QWidget *ShiftEditForm)
    {
        ShiftEditForm->setWindowTitle(QApplication::translate("ShiftEditForm", "Time-Track", 0));
        Add->setText(QApplication::translate("ShiftEditForm", "Add", 0));
        Delete->setText(QApplication::translate("ShiftEditForm", "Delete", 0));
        label_2->setText(QApplication::translate("ShiftEditForm", "Notes:", 0));
        label->setText(QApplication::translate("ShiftEditForm", "Time left:", 0));
        timeLeft->setText(QString());
        RefreshButton->setText(QApplication::translate("ShiftEditForm", "Refresh", 0));
        FinishedButton->setText(QApplication::translate("ShiftEditForm", "Finish", 0));
        CancelButton->setText(QApplication::translate("ShiftEditForm", "Cancel", 0));
    } // retranslateUi

};

namespace Ui {
    class ShiftEditForm: public Ui_ShiftEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SHIFTEDITFORM_H
